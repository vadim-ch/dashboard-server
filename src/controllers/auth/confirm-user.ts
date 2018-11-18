import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { check } from 'express-validator/check';
import { renderDataSuccess } from '../../util/data-render';
import { SESSION_SECRET } from '../../util/env-vars';
import { UserRole } from '../../entity/User';
import * as expressJwtPermissions from 'express-jwt-permissions'
import { userStore } from '../../store/user';

const guard = expressJwtPermissions();

/**
 Подтверждение аккаунта. Доступен только для администраторов
 */
export class ConfirmUser extends Controller implements IController {
  public beforeRequest: Array<any> = [
    guard.check([
      [`${UserRole.Admin}`]
    ])
  ];

  public validateRules: Array<any> = [
    check('userId').isString(),
  ];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // тут надо активировать аккаунт пользователя и послать ему письмо, что его аккаунт подтвердили. можно работать
    await userStore.findAndUpdate(req.body.userId, {active: true});
    renderDataSuccess(req, res, {status: 'ok'});
  }
}
