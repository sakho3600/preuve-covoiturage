import { handler } from '@ilos/common';
import { Action as AbstractAction } from '@ilos/core';

import { TerritoryRepositoryProviderInterfaceResolver } from '../interfaces/TerritoryRepositoryProviderInterface';
import { handlerConfig, ResultInterface } from '../shared/territory/list.contract';
import { blacklist } from '../config/filterOutput';
import { TerritoryListFilter } from '../shared/territory/common/interfaces/TerritoryQueryInterface';

@handler({ ...handlerConfig, middlewares: [['content.blacklist', blacklist.map((k) => `data.*.${k}`)]] })
export class ListTerritoryAction extends AbstractAction {
  constructor(private territoryRepository: TerritoryRepositoryProviderInterfaceResolver) {
    super();
  }

  public async handle(filter?: TerritoryListFilter): Promise<ResultInterface> {
    const data = await this.territoryRepository.all(
      filter && filter.search ? filter.search : undefined,
      filter && filter.limit ? filter.limit : undefined,
      filter && filter.skip ? filter.skip : undefined,
    );

    return {
      data: data.rows,
      meta: {
        pagination: {
          total: data.count,
          offset: filter && filter.skip ? filter.skip : 0,
          limit: filter && filter.limit ? filter.limit : data.count,
        },
      },
    };
  }
}
