import { provider, ServiceContainerInterfaceResolver } from '@ilos/common';

import { FraudCheckRepositoryProviderInterfaceResolver } from '../interfaces/FraudCheckRepositoryProviderInterface';
import { checkList } from './checks';
import { StaticCheckInterface, CheckInterface } from '../interfaces/CheckInterface';

@provider()
export class CheckEngine {
  public readonly checks: StaticCheckInterface[] = [...checkList];

  constructor(
    private repository: FraudCheckRepositoryProviderInterfaceResolver,
    private service: ServiceContainerInterfaceResolver,
  ) {}

  /**
   *  Get a processor from a method string
   *  cast from IOC and initialize if needed
   */
  protected async getCheckProcessor(method: string): Promise<CheckInterface> {
    const processorCtor = this.checks.find((c) => c.key === method);
    if (!processorCtor) {
      throw new Error(`Unknown check ${method}`);
    }

    const processor = this.service.get(processorCtor);
    if ('init' in processor) {
      await processor.init();
    }

    return processor;
  }

  /**
   *  List all available fraud check methods
   */
  listAvailableMethods(): string[] {
    return this.checks.map((c) => c.key);
  }

  /**
   *  List all unprocessed methods for an acquisition id
   */
  async listUnprocessedMethods(acquisitionId: number): Promise<string[]> {
    const processedMethods = (await this.repository.getAllCheckByAcquisition(acquisitionId)).map((m) => m.method);
    return this.listAvailableMethods().filter((method) => processedMethods.indexOf(method) < 0);
  }

  /**
   *  Apply a method on an acquisition_id
   *  - get the check processor
   *  - get the check meta
   *  - if status != done, proccess it
   *  - save result metadata
   */
  async apply(acquisitionId: number, method: string, force = false): Promise<void> {
    const processor = await this.getCheckProcessor(method);
    const checkMeta = await this.repository.findOrCreateFraudCheck(acquisitionId, method);

    if (checkMeta.status === 'done' && !force) {
      return;
    }

    try {
      const { meta, karma } = await processor.handle(acquisitionId, checkMeta.meta);
      await this.repository.updateFraudCheck({
        ...checkMeta,
        meta,
        karma,
        status: 'done',
      });
    } catch (e) {
      await this.repository.updateFraudCheck({
        ...checkMeta,
        status: 'error',
        meta: {
          error: e.message,
        },
      });
      throw e;
    }
  }
}