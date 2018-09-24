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
  notBefore: '2s'
};

export const JwtRefreshOptions = {
  ...JwtCommonOptions,
  expiresIn: config.token.refresh.expiresIn,
  notBefore: '2s'
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

  public sign(payload, signOptions?: object) {
    const jwtSignOptions = {
      ...signOptions,
      ...JwtAccessOptions
    };
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  public refresh(token, refreshOptions?: object) {
    // const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
    // delete payload.iat;
    // delete payload.exp;
    // delete payload.nbf;
    // delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
    // const jwtSignOptions = Object.assign({}, this.options, {jwtid: refreshOptions.jwtid});
    // // The first signing converted all needed options into claims, they are already in the payload
    // return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  public makeAccessToken(userEntity: UserEntityType): Promise<string> {
    const payload = {
      tokenType: config.token.access.type,
      username: userEntity.username,
      userRole: userEntity.role,
      email: userEntity.email
    };
    const options = {
      ...JwtRefreshOptions,
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
}

export const tokenGenerator = new TokenGenerator(
    SESSION_SECRET,
    SESSION_SECRET
);
