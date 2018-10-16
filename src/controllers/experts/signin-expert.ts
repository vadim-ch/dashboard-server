import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {check} from 'express-validator/check';
import {expertLoginHandler} from './helper';
import {expertAuth} from '../../passport';
import {expertsStore} from "../../store/expert";
import {tokenGenerator} from "../../util/token-generator";

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
    expertAuth.authenticate('local', {session: false}, async (err, expert, info) => {
      if (err) {
        next(err);
      }
      if (expert) {
        // const updatedExpert = await expertsStore.findAndUpdateExpert(userId, );

          const accessToken = await tokenGenerator.makeAccessToken(expert);
          const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(expert);
          await expertsStore.addRefreshToken(expert.id, refreshUuid, refreshToken);
        req.login(expert, {session: false}, expertLoginHandler(req, res, next, accessToken, refreshToken));
      }
    })(req, res, next);
  }
}
