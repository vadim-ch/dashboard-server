import {Router} from 'express';
import {BaseRouter, IRouter} from './base-router';
import {renderException} from '../util/data-render';
import * as express from 'express'
import {GetExpertById} from '../controllers/experts/get-expert';
import {PutExpertById} from '../controllers/experts/put-expert';
import {SigninExpert} from '../controllers/experts/signin-expert';
import {SignupExpert} from '../controllers/experts/signup-expert';
import {LogoutExpert} from '../controllers/experts/logout-expert';
import {AllExperts} from '../controllers/experts/all-experts';
const router = express.Router();

export class ExpertsRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(``, ...this.handlerRunner(new AllExperts()));
    router.get(`/:id`, ...this.handlerRunner(new GetExpertById()));
    router.put(`/:id`, ...this.handlerRunner(new PutExpertById()));
    router.post(`/signin`, ...this.handlerRunner(new SigninExpert()));
    router.post(`/register`, ...this.handlerRunner(new SignupExpert()));
    router.post(`/logout`, ...this.handlerRunner(new LogoutExpert()));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}