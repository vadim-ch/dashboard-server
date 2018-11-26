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
import {ConfirmUser} from "../controllers/auth/confirm-user";
import {VerifyRequest} from "../controllers/auth/verify-request";
import {GetCurrentUser} from "../controllers/auth/current-user";
import { logger } from '../logger';

const router = express.Router();

export class AuthRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.post(`/login`, ...this.handlerRunner(new Signin())); // вход по логину паролю
    // регистрация осуществляется только по приглашению
    // router.post(`/register/:registerType`, ...this.handlerRunner(new Signup()));
    router.post(`/logout`, ...this.handlerRunner(new Logout())); // выход

    router.post(`/send-invite`, ...this.handlerRunner(new SendInvite())); // отсылка приглашения на регистрацию на почту
    router.post(`/email-signin`, ...this.handlerRunner(new EmailSignin())); // регистрация или вход по токену
    router.post(`/email-signin-request`, ...this.handlerRunner(new EmailSigninRequest())); // запрос на magic link

    // верификация от админа
    router.post(`/verify-request`, ...this.handlerRunner(new VerifyRequest()));
    router.post(`/confirm-user`, ...this.handlerRunner(new ConfirmUser()));

    router.get(`/current-user`, ...this.handlerRunner(new GetCurrentUser()));
    router.put(`/account`, ...this.handlerRunner(new PutAccount())); // запрос для изменения авторизацилнных данных. пока не работает

    router.use((exception, req, res, next) => {
      logger.error(`Auth router error, method: ${req.url}, exception: ${exception}`);
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}
