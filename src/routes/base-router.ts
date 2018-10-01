import {Request, Response, Router} from "express";
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

  protected handlerRunner(controller: Controller) {
    return asyncHandler(async(req: Request, res: Response, next: (data?: any) => void) => {
      // check validate if exist
      // check auth if exist
      controller.checkAuth(req, res, next);
      controller.validate(req, res, next);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error(errors);
        throw new ValidationError(errors.array());
      }

      await controller.run(req, res, next);
    });
  }
}