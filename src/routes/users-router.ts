import {Router} from 'express';
import {BaseRouter, IRouter} from "./base-router";
import {renderException} from "../util/data-render";
import * as express from 'express'
import {AllUsers} from "../controllers/users/all-users";
import {GetUserById} from "../controllers/users/get-user";
import {checkSchema} from "express-validator/check";
const router = express.Router();

export class UsersRouter extends BaseRouter implements IRouter {
  constructor() {
    super();
  }

  public router(): Router {
    router.get(``, this.handlerRunner(new AllUsers()));
    router.get(`/:id`, this.handlerRunner(new GetUserById()));

    router.use((exception, req, res, next) => {
      renderException(req, res, exception);
      next();
    });

    return router;
  }
}