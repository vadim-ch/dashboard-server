import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {check} from 'express-validator/check';
import {userLoginHandler} from './helper';
import * as passport from 'passport';

export class SigninExpert extends Controller implements IController {
  public validateRules: Array<any> = [
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({min: 5}),
  ];

  constructor() {
    super();
  }

  public validate(req: Request, res: Response, next): void {

  }


  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) {
        next(err);
      }
      if (user) {
        req.login(user, {session: false}, userLoginHandler(user, req, res, next));
      }
    })(req, res, next);
  }
}