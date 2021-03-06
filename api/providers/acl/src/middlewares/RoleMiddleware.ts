import {
  middleware,
  MiddlewareInterface,
  ParamsType,
  ContextType,
  ResultType,
  InvalidParamsException,
  ForbiddenException,
} from '@ilos/common';

import { reduceRoles } from '../helpers/reduceRoles';

/**
 * Check role, may throw a ForbiddenException of a InvalidParamsException
 * @export
 * @param {...string[]} roles
 * @returns {MiddlewareInterface}
 */
@middleware()
export class RoleMiddleware implements MiddlewareInterface {
  async process(params: ParamsType, context: ContextType, next: Function, roles: string[]): Promise<ResultType> {
    const filtered: string[] = roles.filter((i) => !!i);

    if (!filtered.length) {
      throw new InvalidParamsException('No role defined');
    }

    if (!('call' in context) || (!('role' in context.call.user) && !('group' in context.call.user))) {
      throw new ForbiddenException('Invalid permissions');
    }

    const { role, group } = context.call.user;

    const pass = filtered.reduce(reduceRoles(filtered, group, role), true);

    if (!pass) {
      throw new ForbiddenException('Role mismatch');
    }

    return next(params, context);
  }
}
