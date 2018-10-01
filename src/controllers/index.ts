import {Request, Response} from "express";
import {logger} from "../logger";
import { validationResult } from 'express-validator/check';
import {SESSION_SECRET} from "../util/env-vars";
import * as expressJwt from 'express-jwt'

export interface IController {
  validate(req: Request, res: Response, next): void;
  checkAuth(req: Request, res: Response, next): void;
  run(req: Request, res: Response, next: (data?: any) => void): void;
}

export class Controller {
  private secret: string;
  public validateRules: Array<any> = [];
  constructor(secret?: string) {
    this.secret = secret;
  }

  public validate(req: Request, res: Response, next): void {

  }

  public checkAuth = (req: Request, res: Response, next) => {
    if (this.secret) {
      expressJwt({secret: this.secret})(req, res, next);
    } else {
      next();
    }
  };
  //
  // protected checkCurrentUser() {
  //
  // }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    logger.error(`Called base controller handler for ${req.baseUrl}. Need implement method.`);
  }
}