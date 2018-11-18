import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { SESSION_SECRET } from '../../util/env-vars';
import { UserRole } from '../../entity/User';
import * as expressJwtPermissions from 'express-jwt-permissions'
const guard = expressJwtPermissions();

/**
 Запрос на верификацию аккаунта от психолога
 */
export class VerifyRequest extends Controller implements IController {
  public beforeRequest: Array<any> = [
    guard.check([
      [`${UserRole.Expert}`]
    ])
  ];

  public validateRules: Array<any> = [
    // check('user').isEmail(),
  ];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // тут надо оповестить админов о том, что человек просит верификации
    // возмодно потом имеет смысл распределять равномерно нарузку на админов
    // но пока это просто оповещение в максимально простом варианте
    renderDataSuccess(req, res, {status: 'ok'});
  }
}
