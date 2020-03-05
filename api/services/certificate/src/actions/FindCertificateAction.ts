import { Action as AbstractAction } from '@ilos/core';
import { handler } from '@ilos/common';
import { CryptoProviderInterfaceResolver } from '@pdc/provider-crypto';

import { CertificateRepositoryProviderInterfaceResolver } from '../interfaces/CertificateRepositoryProviderInterface';
import { handlerConfig, ResultInterface, ParamsInterface } from '../shared/certificate/find.contract';
import { ActionMiddleware } from '../shared/common/ActionMiddlewareInterface';
import { alias } from '../shared/certificate/find.schema';

@handler(handlerConfig)
export class FindCertificateAction extends AbstractAction {
  // public readonly middlewares: ActionMiddleware[] = [['can', ['certificate.read']], ['validate', alias]];
  public readonly middlewares: ActionMiddleware[] = [['validate', alias]];

  constructor(
    private certRepository: CertificateRepositoryProviderInterfaceResolver,
    private crypto: CryptoProviderInterfaceResolver,
  ) {
    super();
  }

  public async handle(params: ParamsInterface): Promise<ResultInterface> {
    console.log('find', { params });

    const { uuid } = params;

    const certificate = await this.certRepository.findByUuid(uuid, true);

    return {
      uuid: certificate.uuid,
      signature: await this.crypto.sha256(certificate.identity_id + certificate.operator_id + certificate.territory_id),
      start_at: certificate.start_at,
      end_at: certificate.end_at,
      created_at: certificate.created_at,
      total_km: certificate.meta.total_km,
      total_point: certificate.meta.total_point,
      total_cost: certificate.meta.total_cost,
      remaining: certificate.meta.remaining,
    };
  }
}