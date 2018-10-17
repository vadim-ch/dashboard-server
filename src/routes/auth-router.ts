import { Router } from 'express';
import { BaseRouter, IRouter } from './base-router';
import { renderException } from '../util/data-render';
import * as express from 'express'
import { Signin } from '../controllers/auth/signin';
import { Signup } from '../controllers/auth/signup';
import { Logout } from '../controllers/auth/logout';

const router = express.Router();

export class AuthRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.post(`/login`, ...this.handlerRunner(new Signin()));
    router.post(`/register/:registerType`, ...this.handlerRunner(new Signup()));
    router.post(`/logout`, ...this.handlerRunner(new Logout()));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}
