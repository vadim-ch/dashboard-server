import * as jwt from 'jsonwebtoken';
import { SESSION_SECRET } from './secret';
import * as jwtService from '../services/jwt-service';
import { config } from '../../config';

// export const JwtAccessOptions = {
//     expiresIn: 30
// };

const JwtCommonOptions = {
  algorithm: 'HS256',
  noTimestamp: false,
};

export const JwtAccessOptions = {
  ...JwtCommonOptions,
  expiresIn: config.token.access.expiresIn,
  // notBefore: '2s'
};

export const JwtRefreshOptions = {
  ...JwtCommonOptions,
  expiresIn: config.token.refresh.expiresIn,
  // notBefore: '2s'
};

export type UserEntityType = {
  id: string;
  username: string;
  email: string;
  role: string;
}

export class TokenGenerator {
  private secretOrPrivateKey: string;
  private secretOrPublicKey;

  constructor(secretOrPrivateKey, secretOrPublicKey) {
    this.secretOrPrivateKey = secretOrPrivateKey;
    this.secretOrPublicKey = secretOrPublicKey;
  }

  public makeAccessToken(userEntity: UserEntityType): Promise<string> {
    const payload = {
      tokenType: config.token.access.type,
      username: userEntity.username,
      userRole: userEntity.role,
      email: userEntity.email
    };
    const options = {
      ...JwtAccessOptions,
      subject: userEntity.id,
    };
    return jwtService.sign(payload, SESSION_SECRET, options);
  }

  public makeRefreshToken(userEntity: UserEntityType): Promise<string> {
    const timestamp = new Date().getTime();
    const payload = {
      tokenType: config.token.refresh.type,
      email: userEntity.email
    };
    const options = {
      ...JwtRefreshOptions,
      subject: userEntity.id,
    };
    return jwtService.sign(payload, SESSION_SECRET, options)
        // .then(result => `${timestamp}::${result}`)
        .catch(error => { throw new Error(error) });
  }

  public verifyToken(token): Promise<string> {
    return jwtService.verify(token, SESSION_SECRET) as Promise<string>;
  }
}

export const tokenGenerator = new TokenGenerator(
    SESSION_SECRET,
    SESSION_SECRET
);
