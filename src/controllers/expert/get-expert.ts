import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { param } from 'express-validator/check';
import { expertsStore } from '../../store/expert';
import { paramUserIdField } from '../helper';

export class GetExpertById extends Controller implements IController {
  public validateRules: Array<any> = [
    param(paramUserIdField).isString().isLength({min: 5}),
  ];

  constructor() {
    super();
  }

  public validate(req: Request, res: Response, next): void {
    // const { userId } = req.params;
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
    const {expertId} = req.params;
    const expert = await expertsStore.getUserById(expertId);
    renderDataSuccess(req, res, expert);
  }
}
