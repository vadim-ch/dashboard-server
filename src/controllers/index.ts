import {Request, Response} from "express";
import {logger} from "../logger";
import { validationResult } from 'express-validator/check';

export interface IController {
  validate(req: Request, res: Response, next): void;
  checkAuth(): void;
  run(req: Request, res: Response, next: (data?: any) => void): void;
}

export class Controller {
  constructor() {

  }

  public validate(req: Request, res: Response, next): void {

  }

  public checkAuth() {

  }
  //
  // protected checkCurrentUser() {
  //
  // }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    logger.error(`Called base controller handler for ${req.baseUrl}. Need implement method.`);
  }
}