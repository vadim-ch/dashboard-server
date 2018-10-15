import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {check, validationResult} from "express-validator/check";
import {ValidationError} from "../../errors/validation-error";
import {SESSION_SECRET} from "../../util/env-vars";
import {renderDataSuccess} from "../../util/data-render";

export class LogoutUser extends Controller implements IController {
  public validateRules: Array<any> = [];

  constructor() {
    super(SESSION_SECRET);
  }

  public validate(req: Request, res: Response, next): void {

  }


  public async run(req: Request, res: Response, next: (data?: any) => void) {
    await req.logout();
    renderDataSuccess(req, res, {message: 'Expert is logged out'});
  }
}
