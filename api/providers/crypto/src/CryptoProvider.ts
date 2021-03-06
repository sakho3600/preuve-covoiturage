import crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import md5 from 'crypto-js/md5';
import { provider, ProviderInterface } from '@ilos/common';

import { CryptoProviderInterfaceResolver } from './interfaces/CryptoProviderInterface';

@provider({
  identifier: CryptoProviderInterfaceResolver,
})
export class CryptoProvider implements ProviderInterface {
  private saltRounds = 10;

  md5(content: string): string {
    return md5(content).toString();
  }

  async sha256(content: string): Promise<string> {
    // TODO get secret from config
    return crypto.createHmac('sha256', 'abcd').update(content).digest('base64');
  }

  async cryptPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.saltRounds);
  }
  async cryptToken(plainToken: string): Promise<string> {
    return bcrypt.hash(plainToken, this.saltRounds);
  }
  async comparePassword(plainPwd: string, hashedPwd: string): Promise<boolean> {
    return bcrypt.compare(plainPwd, hashedPwd);
  }

  async compareToken(plainToken: string, hashedToken: string): Promise<boolean> {
    return bcrypt.compare(plainToken, hashedToken);
  }

  public generateToken(length = 32): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < Math.abs(length || 32); i = i + 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
