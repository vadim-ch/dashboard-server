import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {renderDataSuccess} from '../../util/data-render';
import {userStore, UserUpdateFields} from '../../store/users';
import {NotFoundError} from "../../errors/not-found-error";
import {check, checkSchema, param, validationResult} from "express-validator/check";
import {ValidationError} from "../../errors/validation-error";
import {SESSION_SECRET} from "../../util/env-vars";
import {userLoginHandler} from "./helper";

export class SignupUser extends Controller implements IController {
  public validateRules: Array<any> = [
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({min: 5}),
    check('username').isLength({min: 2}),
  ];

  constructor() {
    super();
  }

  public validate(req: Request, res: Response, next): void {

  }


  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const rawUser = await userStore.createNewUser({
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
    });
    req.login(rawUser, {session: false}, userLoginHandler(rawUser, req, res, next));
  }
}