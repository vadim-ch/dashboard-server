import { Router } from 'express';
import { BaseRouter, IRouter } from './base-router';
import { renderException } from '../util/data-render';
import * as express from 'express'
import { AllUsers } from '../controllers/client/all-users';
import { GetUserById } from '../controllers/client/get-user';
import { PutUserById } from '../controllers/client/put-user';
import { GetCurrentUser } from '../controllers/client/current-user';
import { paramUserIdField } from '../controllers/helper';

const router = express.Router();

export class UsersRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(``, ...this.handlerRunner(new AllUsers()));
    router.get(`/current`, ...this.handlerRunner(new GetCurrentUser()));
    router.get(`/:${paramUserIdField}`, ...this.handlerRunner(new GetUserById()));
    router.put(`/:${paramUserIdField}`, ...this.handlerRunner(new PutUserById()));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}
