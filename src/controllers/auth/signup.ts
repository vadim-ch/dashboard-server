import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { check, param } from 'express-validator/check';
import { loginHandler } from '../helper';
import { tokenGenerator } from '../../util/token-generator';
import { userStore } from '../../store/user';

const RegisterType = {
  Client: 'client',
  Expert: 'expert'
};

export class Signup extends Controller implements IController {
  public validateRules: Array<any> = [
    param('registerType').isString().isIn([RegisterType.Expert, RegisterType.Client]),
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({min: 5}),
    // check('firstName').isLength({min: 2}),
  ];

  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const registerType = req.params.registerType;
    const newUserData = {
      email: req.body.email,
      password: req.body.password,
    };
    const rawUser = await userStore.createNewClient(newUserData);
    // await userStore.createNewExpert(newUserData, {
    //   firstName: 'first',
    //   lastName: 'last',
    //   middleName: 'middle',
    //   birthday: new Date(),
    //   gender: GenderEnum.Male
    // })

    const accessToken = await tokenGenerator.makeAccessToken(rawUser);
    const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(rawUser);
    await userStore.addRefreshToken(rawUser.id, refreshUuid, refreshToken);
    req.login(rawUser, {session: false}, loginHandler(req, res, next, accessToken, refreshToken));
  }
}
