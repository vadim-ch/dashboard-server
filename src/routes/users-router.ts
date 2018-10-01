import {Router} from 'express';
import {BaseRouter, IRouter} from './base-router';
import {renderException} from '../util/data-render';
import * as express from 'express'
import {AllUsers} from '../controllers/users/all-users';
import {GetUserById} from '../controllers/users/get-user';
import {checkSchema} from 'express-validator/check';
import {PutUserById} from '../controllers/users/put-user';
import {SigninUser} from '../controllers/users/signin-user';
import {SignupUser} from '../controllers/users/signup-user';
import {LogoutUser} from '../controllers/users/logout-user';
const router = express.Router();

export class UsersRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(``, this.handlerRunner(new AllUsers()));
    const getUser = new GetUserById();
    const putUser = new PutUserById();
    const signin = new SigninUser();
    const signup = new SignupUser();
    const logout = new LogoutUser();
    router.get(`/:id`, getUser.validateRules, this.handlerRunner(getUser));
    router.put(`/:id`, putUser.validateRules, this.handlerRunner(putUser));
    router.post(`/login`, signin.validateRules, this.handlerRunner(signin));
    router.post(`/signup`, signup.validateRules, this.handlerRunner(signup));
    router.post(`/logout`, logout.validateRules, this.handlerRunner(logout));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}