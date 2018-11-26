import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { check } from 'express-validator/check';
import { renderDataSuccess } from '../../util/data-render';
import * as jwtService from '../../services/jwt-service';
import { EMAIL_SIGNIN_SECRET, SESSION_SECRET } from '../../util/env-vars';
import { UserRole } from '../../entity/User';
import * as expressJwtPermissions from 'express-jwt-permissions'
import { sendInviteToEmail } from '../../services/mailer';

const guard = expressJwtPermissions();

export class SendInvite extends Controller implements IController {
  public beforeRequest: Array<any> = [
    guard.check([
      [`${UserRole.Expert}`],
      [`${UserRole.Admin}`]
    ])
  ];

  public validateRules: Array<any> = [
    check('email').isEmail(),
  ];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // setup email data with unicode symbols
    const token = await this.generateToken(req.user.sub, req.body.email);
    sendInviteToEmail(req.body.email, token);
    renderDataSuccess(req, res, {status: 'ok'});
  }

  private generateToken(userId: string, invitedEmail: string) {
    const payload = {
      role: UserRole.Expert,
      maintainerId: userId,
      email: invitedEmail
    };
    const options = {
      algorithm: 'HS256',
      noTimestamp: false,
      expiresIn: '5m',
    };
    return jwtService.sign(payload, EMAIL_SIGNIN_SECRET, options)
  }
}
