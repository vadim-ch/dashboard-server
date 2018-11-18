import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { SESSION_SECRET } from '../../util/env-vars';
import {UserRole} from '../../entity/User';
import * as expressJwtPermissions from 'express-jwt-permissions'

const guard = expressJwtPermissions();

export class GetCurrentUser extends Controller implements IController {
  public beforeRequest: Array<any> = [
    guard.check([
      [`${UserRole.Expert}`],
      [`${UserRole.Admin}`]
      [`${UserRole.Client}`]
    ])
  ];
  public validateRules: Array<any> = [];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const authUserId = req.user ? req.user.sub : null;
    // const user = await expertsStore.getUserById(userId);
    // рабочий вариант. разница в том что делается join
    // const expert = await expertsStore.getExpertByUserId(authUserId);
    renderDataSuccess(req, res, req.user);
  }
}
