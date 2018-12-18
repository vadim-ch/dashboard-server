import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { check } from 'express-validator/check';
import { SESSION_SECRET } from '../../util/env-vars';
import {userStore} from '../../store/user';

export class PutAccount extends Controller implements IController {
  public validateRules: Array<any> = [
    check('password').isString().isLength({min: 6}),
  ];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const authUserId = req.user.sub;
    const requestData = req.body;
    const user = await userStore.changePassword(authUserId, requestData.password);
    const isPasswordExist = await user.isPasswordExist();
    renderDataSuccess(req, res, {
      userId: authUserId,
      email: user.email,
      profileId: user.profileId,
      role: user.role,
      isPasswordExist
    });
  }
}
