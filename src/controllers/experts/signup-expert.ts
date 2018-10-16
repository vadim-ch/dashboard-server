import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {check} from "express-validator/check";
import {expertLoginHandler} from "./helper";
import {expertsStore} from "../../store/expert";
import {tokenGenerator} from "../../util/token-generator";

export class SignupExpert extends Controller implements IController {
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
    const rawExpert = await expertsStore.createNewExpert({
      firstName: req.body.firstName,
      lastName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      age: '56'
    });
    const accessToken = await tokenGenerator.makeAccessToken(rawExpert);
    const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(rawExpert);
    await expertsStore.addRefreshToken(rawExpert.id, refreshUuid, refreshToken);
    req.login(rawExpert, {session: false}, expertLoginHandler(req, res, next, accessToken, refreshToken));
  }
}