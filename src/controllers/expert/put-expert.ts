import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { param } from 'express-validator/check';
import { SESSION_SECRET } from '../../util/env-vars';
import { expertsStore } from '../../store/expert';
import { paramUserIdField } from '../helper';
import { UserCheckerType } from '../index';

const checkUserRules: UserCheckerType = {
  paramUserIdField,
};

export class PutExpertById extends Controller implements IController {
  public validateRules: Array<any> = [
    param(paramUserIdField).isString().isLength({min: 5}),
  ];

  constructor() {
    super(SESSION_SECRET, checkUserRules);
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
    const expertId = req.params.userId;
    let updateData: any = {};
    if (req.body.firstName) {
      updateData.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      updateData.lastName = req.body.lastName;
    }
    if (req.body.middleName) {
      updateData.middleName = req.body.middleName;
    }
    if (req.body.age) {
      updateData.age = req.body.age;
    }
    if (req.body.hours) {
      updateData.hours = req.body.hours;
    }
    await expertsStore.findAndUpdateExpert(expertId, updateData);
    renderDataSuccess(req, res, {});
  }
}
