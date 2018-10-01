import {Router} from 'express';
import {BaseRouter, IRouter} from './base-router';
import {renderException} from '../util/data-render';
import * as express from 'express'
import {AllUsers} from '../controllers/users/all-users';
import {GetUserById} from '../controllers/users/get-user';
import {PutUserById} from '../controllers/users/put-user';
import {SigninUser} from '../controllers/users/signin-user';
import {SignupUser} from '../controllers/users/signup-user';
import {LogoutUser} from '../controllers/users/logout-user';
import {GetCurrentUser} from "../controllers/users/current-user";
const router = express.Router();

export class UsersRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(``, ...this.handlerRunner(new AllUsers()));
    router.get(`/current`, ...this.handlerRunner(new GetCurrentUser()));
    router.get(`/:id`, ...this.handlerRunner(new GetUserById()));
    router.put(`/:id`, ...this.handlerRunner(new PutUserById()));
    router.post(`/login`, ...this.handlerRunner(new SigninUser()));
    router.post(`/register`, ...this.handlerRunner(new SignupUser()));
    router.post(`/logout`, ...this.handlerRunner(new LogoutUser()));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}