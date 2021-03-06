import { SESSION_SECRET } from './env-vars';
import * as jwtService from '../services/jwt-service';
import * as uuidv1 from 'uuid/v1';
import { config } from '../../config';
import { UserRole } from '../entity/User';

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

// const roles = [UserRole.Admin, UserRole.Expert, UserRole.Client];

export type UserEntityType = {
  id: string;
  role: UserRole;
  profileId: number;
  email: string;
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
      email: userEntity.email,
      profileId: userEntity.profileId,
      role: userEntity.role,
      permissions: [
        userEntity.role
      ]
    };
    const options = {
      ...JwtAccessOptions,
      subject: userEntity.id,
    };
    return jwtService.sign(payload, SESSION_SECRET, options);
  }

  public makeRefreshToken(userEntity: UserEntityType): Promise<Array<string>> {
    const payload = {
      tokenType: config.token.refresh.type,
      email: userEntity.email
    };
    const jwtid = uuidv1();
    const options = {
      ...JwtRefreshOptions,
      subject: userEntity.id,
      jwtid
    };
    return jwtService.sign(payload, SESSION_SECRET, options)
        .then(refreshToken => {
          return [refreshToken, jwtid];
        })
        .catch(error => {
          throw new Error(error)
        });
  }

  public verifyToken(token): Promise<string> {
    return jwtService.verify(token, SESSION_SECRET) as Promise<string>;
  }
}

export const tokenGenerator = new TokenGenerator(
    SESSION_SECRET,
    SESSION_SECRET
);
