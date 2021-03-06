import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { check } from 'express-validator/check';
import { loginHandler } from '../helper';
import { userAuth } from '../../passport';
import { tokenGenerator } from '../../util/token-generator';
import { userStore } from '../../store/user';

export class Signin extends Controller implements IController {
  public validateRules: Array<any> = [
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({min: 6}),
  ];

  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    userAuth.authenticate('local', {session: false}, async (err, user, info) => {
      if (err) {
        next(err);
      }
      if (user) {
        const accessToken = await tokenGenerator.makeAccessToken(user);
        const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(user);
        await userStore.addRefreshToken(user.id, refreshUuid, refreshToken);
        const isPasswordExist = await user.isPasswordExist();
        req.login(user, {session: false}, loginHandler(req, res, next, accessToken, refreshToken, isPasswordExist));
      }
    })(req, res, next);
  }
}
