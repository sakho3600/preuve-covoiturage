import { provider, NotFoundException } from '@ilos/common';
import { PostgresConnection } from '@ilos/connection-postgres';

import { RepositoryInterface as ListInterface } from '../shared/application/list.contract';
import { RepositoryInterface as FindInterface } from '../shared/application/find.contract';
import { RepositoryInterface as CreateInterface } from '../shared/application/create.contract';
import { RepositoryInterface as RevokeInterface } from '../shared/application/revoke.contract';
import { ApplicationInterface } from '../shared/application/common/interfaces/ApplicationInterface';
import {
  ApplicationRepositoryProviderInterface,
  ApplicationRepositoryProviderInterfaceResolver,
} from '../interfaces/ApplicationRepositoryProviderInterface';

@provider({
  identifier: ApplicationRepositoryProviderInterfaceResolver,
})
export class ApplicationPgRepositoryProvider implements ApplicationRepositoryProviderInterface {
  public readonly table = 'application.applications';

  constructor(protected connection: PostgresConnection) {}

  async list({ owner_id, owner_service }: ListInterface): Promise<ApplicationInterface[]> {
    const query = {
      text: `
        SELECT * FROM ${this.table}
        WHERE owner_service = $1
        AND owner_id = $2::int
        AND deleted_at IS NULL
      `,
      values: [owner_service, owner_id],
    };

    const result = await this.connection.getClient().query(query);

    if (!result.rowCount) return [];

    return result.rows;
  }

  async find({ uuid, owner_id, owner_service }: FindInterface): Promise<ApplicationInterface> {
    const query = {
      text: `
        SELECT * FROM ${this.table}
        WHERE owner_service = $1
        AND owner_id = $2::int
        AND uuid = $3
        AND deleted_at IS NULL
        LIMIT 1
      `,
      values: [owner_service, owner_id, uuid],
    };

    const result = await this.connection.getClient().query(query);

    if (result.rowCount !== 1) {
      throw new Error(`Application not found (${uuid})`);
    }

    return result.rows[0];
  }

  async findByUuid({ uuid }: { uuid: string }): Promise<ApplicationInterface> {
    const query = {
      text: `
        SELECT * FROM ${this.table}
        WHERE uuid = $1
        LIMIT 1
      `,
      values: [uuid],
    };

    const result = await this.connection.getClient().query(query);

    if (result.rowCount !== 1) {
      throw new Error(`Application not found (${uuid})`);
    }

    return result.rows[0];
  }

  async create({ name, owner_id, owner_service, permissions }: CreateInterface): Promise<ApplicationInterface> {
    const query = {
      text: `
        INSERT INTO ${this.table} (
          name, owner_id, owner_service, permissions
        ) VALUES (
          $1, $2, $3, $4
        ) RETURNING *
      `,
      values: [name, owner_id, owner_service, permissions],
    };

    const result = await this.connection.getClient().query(query);

    if (result.rowCount !== 1) {
      throw new Error(`Unable to create application (${name})`);
    }

    return result.rows[0];
  }

  async revoke({ uuid, owner_id, owner_service }: RevokeInterface): Promise<void> {
    const query = {
      text: `
        UPDATE ${this.table}
        SET deleted_at = NOW()
        WHERE owner_service = $1
        AND owner_id = $2::int
        AND uuid = $3
        AND deleted_at IS NULL
      `,
      values: [owner_service, owner_id, uuid],
    };

    const result = await this.connection.getClient().query(query);

    if (result.rowCount !== 1) {
      throw new NotFoundException(`Revoking application failed (${uuid})`);
    }
  }
}
