import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {check} from 'express-validator/check';
import * as expressJwt from 'express-jwt'
import {EMAIL_SIGNIN_SECRET} from '../../util/env-vars';
import {tokenGenerator} from '../../util/token-generator';
import {userStore} from '../../store/user';
import {loginHandler} from '../helper';
import {UserRole} from '../../entity/User';
import {logger} from "../../logger";

export class EmailSignin extends Controller implements IController {
  public beforeRequest: Array<any> = [
    expressJwt({
      secret: EMAIL_SIGNIN_SECRET,
      credentialsRequired: false,
      getToken: (req) => {
        if (req.body) return req.body.token;
        return null;
      },
    })
  ];

  public validateRules: Array<any> = [
    check('token').isLength({min: 5}),
  ];

  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const user = req.user;
    const existUser = await userStore.getByEmail(user.email);
    let result;
    if (existUser) {
      // result = await userStore.findAndUpdate(existUser.id, {role: UserRole.Expert})
      // тут не хватает создания записи в таблице expert
      result = existUser;
    } else {
      if (user.role === UserRole.Expert) {
        try {
          result = await userStore.createNewExpert({email: user.email});
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error('signup only experts');
      }
    }

    const accessToken = await tokenGenerator.makeAccessToken(result);
    const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(result);
    await userStore.addRefreshToken(result.id, refreshUuid, refreshToken);
    req.login(user, {session: false}, loginHandler(req, res, next, accessToken, refreshToken));
  }
}
