import { Exceptions } from '@pdc/core';

import { mockConnectedUserBase } from './connectedUserBase';
import { mockNewUserBase } from './newUserBase';
import axios from "axios";




interface UserparamsInterface {
  permissions: string[];
  aom?:string;
  operator?:string;
}

interface AomOperator {
  aom?:string;
  operator?:string;
}


export class MockFactory {

  port = '8081';

  public call(method: string,
              data: any,
              group:string = 'registry',
              role:string = 'admin',
              userparams: UserparamsInterface = { permissions : [] },
              _id:string = 'fakeId') {
    return {
      method,
      id: 1,
      jsonrpc: '2.0',
      params: {
        params: data,
        _context: {
          channel: {
            service: 'proxy',
            transport: 'http',
          },
          call: {
            user: { ...mockConnectedUserBase, group, role, _id, ...userparams },
          },
        },
      },
    };
  }

  public newUser(group:string = 'registry', role:string = 'admin', aomOperator: AomOperator = {}, email?) {

    return {
      ...mockNewUserBase,
      group,
      role,
      email : email || `${mockNewUserBase.firstname}.${mockNewUserBase.lastname}@${group}.com`,
      ...aomOperator,
    };
  }

  public error(err: Exceptions.RPCException) {
    return {
      status: 200,
      data: {
        jsonrpc: '2.0',
        id: 1,
        error: {
          code: err.rpcError.code,
          message: err.rpcError.message,
          data: err.rpcError.data,
        },
      },
    };
  }

  public request() {
    return axios.create({
      baseURL: `http://127.0.0.1:${this.port}`,
      timeout: 1000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
