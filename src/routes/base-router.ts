import {Request, Response, Router, RequestHandler} from "express";
import {asyncHandler} from "../util/async-handler";
import {Controller} from "../controllers";
import { validationResult } from 'express-validator/check';
import {ValidationError} from "../errors/validation-error";

export interface IRouter {
  router(): Router
}


export class BaseRouter {
  constructor() {

  }

  protected handlerRunner(controller: Controller): Array<any> {
    return [
      controller.checkAuth,
      controller.validateRules,
      controller.checkCurrentUser,
      ...controller.beforeRequest,
      asyncHandler(async(req: Request, res: Response, next: (data?: any) => void) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ValidationError(errors.array());
        }

        await controller.run(req, res, next);
      })
    ];
  }
}
