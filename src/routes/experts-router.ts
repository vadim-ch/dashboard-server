import {Router} from 'express';
import {BaseRouter, IRouter} from './base-router';
import { renderDataSuccess, renderException } from '../util/data-render';
import * as express from 'express'
import {GetExpertById} from '../controllers/expert/get-expert';
import {PutExpertById} from '../controllers/expert/put-expert';
import {AllExperts} from '../controllers/expert/all-experts';
import {paramUserIdField} from "../controllers/helper";
const router = express.Router();

export class ExpertsRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(``, ...this.handlerRunner(new AllExperts()));
    router.get(`/:${paramUserIdField}`, ...this.handlerRunner(new GetExpertById()));
    router.put(`/:${paramUserIdField}`, ...this.handlerRunner(new PutExpertById()));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}
