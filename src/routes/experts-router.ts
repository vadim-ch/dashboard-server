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
    router.get(``, this.handlerRunner(new AllExperts()));
    const getExpert = new GetExpertById();
    const putExpert = new PutExpertById();
    const signin = new SigninExpert();
    const signup = new SignupExpert();
    const logout = new LogoutExpert();
    router.get(`/:id`, getExpert.validateRules, this.handlerRunner(getExpert));
    router.put(`/:id`, putExpert.validateRules, this.handlerRunner(putExpert));
    router.post(`/signin`, signin.validateRules, this.handlerRunner(signin));
    router.post(`/signup`, logout.validateRules, this.handlerRunner(signup));
    router.post(`/logout`, signup.validateRules, this.handlerRunner(logout));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}