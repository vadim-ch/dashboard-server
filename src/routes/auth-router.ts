import { Router } from 'express';
import { BaseRouter, IRouter } from './base-router';
import { renderException } from '../util/data-render';
import * as express from 'express'
import { Signin } from '../controllers/auth/signin';
import { Logout } from '../controllers/auth/logout';
import { SendInvite } from '../controllers/auth/send-invite';
import { EmailSignin } from '../controllers/auth/email-signin';
import { EmailSigninRequest } from '../controllers/auth/email-signin-request';
import { PutAccount } from '../controllers/auth/account';

const router = express.Router();

export class AuthRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.post(`/login`, ...this.handlerRunner(new Signin()));

    // регистрация осуществляется только по приглашению
    // router.post(`/register/:registerType`, ...this.handlerRunner(new Signup()));
    router.post(`/logout`, ...this.handlerRunner(new Logout()));

    router.post(`/send-invite`, ...this.handlerRunner(new SendInvite()));
    router.post(`/email-signin`, ...this.handlerRunner(new EmailSignin()));
    router.post(`/email-signin-request`, ...this.handlerRunner(new EmailSigninRequest()));
    router.put(`/account`, ...this.handlerRunner(new PutAccount()));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}
