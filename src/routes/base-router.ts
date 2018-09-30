import {Request, Response, Router} from "express";
import {asyncHandler} from "../util/async-handler";
import {Controller} from "../controllers";

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
      controller.validate(req, res, next);
      await controller.run(req, res, next);
    });
  }
}