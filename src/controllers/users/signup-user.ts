import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {userStore} from '../../store/users';
import {check} from "express-validator/check";
import { tokenGenerator } from '../../util/token-generator';
import { loginHandler } from '../helper';

export class SignupUser extends Controller implements IController {
  public validateRules: Array<any> = [
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({min: 5}),
    check('firstName').isLength({min: 2}),
  ];

  constructor() {
    super();
  }

  public validate(req: Request, res: Response, next): void {

  }


  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const rawUser = await userStore.createNewUser({
      firstName: req.body.firstName,
      lastName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      age: '108'
    });
    const accessToken = await tokenGenerator.makeAccessToken(rawUser);
    const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(rawUser);
    await userStore.addRefreshToken(rawUser.id, refreshUuid, refreshToken);
    req.login(rawUser, {session: false}, loginHandler(req, res, next, accessToken, refreshToken));
  }
}
