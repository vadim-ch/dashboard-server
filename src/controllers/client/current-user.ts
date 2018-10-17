import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { clientStore } from '../../store/client';
import { NotFoundError } from '../../errors/not-found-error';
import { SESSION_SECRET } from '../../util/env-vars';

export class GetCurrentUser extends Controller implements IController {
  public validateRules: Array<any> = [];

  constructor() {
    super(SESSION_SECRET);
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
    const userId = req.user ? req.user.sub : null;
    if (userId) {
      const user = await clientStore.getUserById(userId);
      // const user = await userStore.getUserById(userId);
      if (!user) {
        throw new NotFoundError(`User not found`);
      }
      renderDataSuccess(req, res, user);
    }
  }
}