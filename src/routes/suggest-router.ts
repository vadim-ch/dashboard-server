import {Router} from 'express';
import {BaseRouter, IRouter} from './base-router';
import { renderException } from '../util/data-render';
import * as express from 'express'
import { AllApproaches } from '../controllers/suggest/approaches/all';
import { AllMethods } from '../controllers/suggest/methods/all';
import { AllRequests } from '../controllers/suggest/requests/all';
import { logger } from '../logger';
const router = express.Router();

export class SuggestRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(`/approaches`, ...this.handlerRunner(new AllApproaches()));
    router.get(`/methods`, ...this.handlerRunner(new AllMethods()));
    router.get(`/requests`, ...this.handlerRunner(new AllRequests()));

    router.use((exception, req, res, next) => {
      logger.error(`Suggest router error, method: ${req.url}, exception: ${exception}`);
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}
