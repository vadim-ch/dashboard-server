import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {renderDataSuccess} from '../../util/data-render';
import {userStore} from '../../store/users';
import {NotFoundError} from "../../errors/not-found-error";
import {checkSchema, param, validationResult} from "express-validator/check";
import {ValidationError} from "../../errors/validation-error";
import {SESSION_SECRET} from "../../util/env-vars";

export class GetUserById extends Controller implements IController {
  public validateRules: Array<any> = [
    param('id').isString().isBase64().isLength({min: 5}),
  ];

  constructor() {
    super();
  }

  public validate(req: Request, res: Response, next): void {
    const userId = req.params.id;
    // req['check']({
    //   id: {
    //     // The location of the field, can be one or more of body, cookies, headers, params or query.
    //     // If omitted, all request locations will be checked
    //     in: ['params'],
    //     errorMessage: 'ID is wrong',
    //     isInt: true,
    //     // Sanitizers can go here as well
    //     toInt: true,
    //     isLength: {options: {min: 1, max: 3}}
    //   },
    // })


  }


  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const userId = req.params.id;
    const user = await userStore.getUserById(userId);
    if (!user) {
      throw new NotFoundError(`User '${userId}' not found`);
    }
    renderDataSuccess(req, res, user);
  }
}