import {Router} from 'express';
import {BaseRouter, IRouter} from './base-router';
import { renderDataSuccess, renderException } from '../util/data-render';
import * as express from 'express'
import {GetExpertById} from '../controllers/expert/get-expert';
import {AllExperts} from '../controllers/expert/all-experts';
import {paramUserIdField} from "../controllers/helper";
import { logger } from '../logger';
import { GetProfile } from '../controllers/profile/get';
import { PutProfile } from '../controllers/profile/put';
const router = express.Router();

export class ProfileRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(`/`, ...this.handlerRunner(new GetProfile()));
    router.put(`/`, ...this.handlerRunner(new PutProfile()));

    router.use((exception, req, res, next) => {
      logger.error(`Profile router error, method: ${req.url}, exception: ${exception}`);
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}
