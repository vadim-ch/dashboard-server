import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { check } from 'express-validator/check';
import * as nodemailer from 'nodemailer';
import { renderDataSuccess } from '../../util/data-render';
import * as jwtService from '../../services/jwt-service';
import { EMAIL_SIGNIN_SECRET, SESSION_SECRET } from '../../util/env-vars';
import { UserRole } from '../../entity/User';
import * as expressJwtPermissions from 'express-jwt-permissions'

const guard = expressJwtPermissions();

let transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 2525
});

/**
  Запрос на magic link
 */
export class EmailSigninRequest extends Controller implements IController {
  public validateRules: Array<any> = [
    check('email').isEmail(),
  ];

  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // метод для запроса magic link на емейл
    const token = await this.generateToken(req.body.email);
    renderDataSuccess(req, res, {status: 'ok'});
  }

  private generateToken(email: string) {
    const payload = {
      email: email
    };
    const options = {
      algorithm: 'HS256',
      noTimestamp: false,
      expiresIn: '10h',
    };
    return jwtService.sign(payload, EMAIL_SIGNIN_SECRET, options)
  }
}
