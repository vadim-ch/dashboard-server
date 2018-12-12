import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { clientStore } from '../../store/client';
import { NotFoundError } from '../../errors/not-found-error';
import { checkSchema, param, validationResult } from 'express-validator/check';
import { ValidationError } from '../../errors/validation-error';
import { SESSION_SECRET } from '../../util/env-vars';

export class PutUserById extends Controller implements IController {
  public validateRules: Array<any> = [
    param('id').isString().isBase64().isLength({min: 5}),
  ];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const userId = req.params.id;
    let updateData: any = {};
    if (req.body.firstName) {
      updateData.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      updateData.lastName = req.body.lastName;
    }
    const user = await clientStore.findAndUpdateUser(userId, updateData);
    if (!user) {
      throw new NotFoundError(`User '${userId}' not found`);
    }
    renderDataSuccess(req, res, user);
  }
}
