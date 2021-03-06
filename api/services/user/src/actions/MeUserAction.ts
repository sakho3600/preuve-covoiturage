import { Action as AbstractAction } from '@ilos/core';
import { handler, UnauthorizedException } from '@ilos/common';
import { get } from 'lodash';

import { handlerConfig, ParamsInterface, ResultInterface } from '../shared/user/me.contract';
import { UserContextInterface } from '../shared/user/common/interfaces/UserContextInterfaces';
import { UserRepositoryProviderInterfaceResolver } from '../interfaces/UserRepositoryProviderInterface';
import { userWhiteListFilterOutput } from '../config/filterOutput';

/*
 * Find user by id
 */
@handler({ ...handlerConfig, middlewares: [['content.whitelist', userWhiteListFilterOutput]] })
export class MeUserAction extends AbstractAction {
  constructor(private userRepository: UserRepositoryProviderInterfaceResolver) {
    super();
  }

  public async handle(params: ParamsInterface, context: UserContextInterface): Promise<ResultInterface> {
    const _id = get(context, 'call.user._id', null);
    if (!_id) {
      throw new UnauthorizedException('No connected user');
    }

    const user = await this.userRepository.find(_id);
    if (!user) throw new UnauthorizedException('No connected user');

    return user;
  }
}
