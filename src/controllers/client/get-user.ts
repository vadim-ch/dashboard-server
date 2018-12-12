import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { clientStore } from '../../store/client';
import { NotFoundError } from '../../errors/not-found-error';
import { param } from 'express-validator/check';

export class GetUserById extends Controller implements IController {
  public validateRules: Array<any> = [
    param('id').isString().isBase64().isLength({min: 5}),
  ];

  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const userId = req.params.id;
    const user = await clientStore.getUserById(userId);
    if (!user) {
      throw new NotFoundError(`User '${userId}' not found`);
    }
    renderDataSuccess(req, res, user);
  }
}
