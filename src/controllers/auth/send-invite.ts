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

const url = 'http://localhost:8081';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'svjy3c7swvnpaeis@ethereal.email', // generated ethereal user
    pass: 'kmzRgS8Z9DM7FBysWT' // generated ethereal password
  }
});

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
    let mailOptions = {
      to: req.body.email, // list of receivers
      subject: 'Hello ✔', // Subject line
      html: `
        <h1>Найди своего психолога</h1>
        <h3>Вас пригласили в проект НСП</h3>
        <a href="${url}/settings/?email-token=${encodeURIComponent(token)}">
          Заполнить профиль
        </a>
      `,
      text: `${url}/settings/?email-token=${encodeURIComponent(token)}`,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
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
