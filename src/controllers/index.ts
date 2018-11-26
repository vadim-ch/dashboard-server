import { Request, Response } from 'express';
import { logger } from '../logger';
import * as expressJwt from 'express-jwt'
import { NotOwnedError } from '../errors/no-owned-error';
import { paramUserIdField } from './helper';

export type UserCheckerType = {
  paramUserIdField?: string;
};

export interface IController {

  checkAuth(req: Request, res: Response, next): void;

  run(req: Request, res: Response, next: (data?: any) => void): void;
}

export class Controller {
  private secret: string;
  private checkUserRules: UserCheckerType;
  public beforeRequest: Array<any> = []; // массив middleware, которые выполняться перед хендлером запроса
  public validateRules: Array<any> = []; // правила для валидации запроса

  constructor(secret?: string, checkUserRules?: UserCheckerType) {
    this.secret = secret;
    if (checkUserRules) {
      this.checkUserRules = checkUserRules;
    }
  }

  public checkAuth = (req: Request, res: Response, next) => {
    if (this.secret) {
      // https://github.com/auth0-blog/cookie-jwt-auth/blob/master/server.js
      expressJwt({
        secret: this.secret,
        getToken: function fromHeaderOrCookie(req) {
          if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
          } else if(req.cookies && req.cookies.id_token) {
            return req.cookies.id_token;
          }
          return null;
        }
      })(req, res, next);
    } else {
      next();
    }
  };

  public checkCurrentUser = (req: Request, res: Response, next) => {
    if (this.checkUserRules) {
      const authUserId = req.user.sub;
      const userIdFromParams = req.params[this.checkUserRules.paramUserIdField];
      if (userIdFromParams && userIdFromParams === authUserId) {
        next();
      } else {
        throw new NotOwnedError(`User ${authUserId} access is denied`);
      }
    } else {
      next();
    }
  };

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    logger.error(`Called base controller handler for ${req.baseUrl}. Need implement method.`);
  }
}
