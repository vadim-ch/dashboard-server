import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { SESSION_SECRET } from '../../util/env-vars';
import { renderDataSuccess } from '../../util/data-render';

export class Logout extends Controller implements IController {
  public validateRules: Array<any> = [];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    await req.logout();
    res.clearCookie('at');
    res.clearCookie('rt');
    renderDataSuccess(req, res, {message: 'Expert is logged out'});
  }
}
