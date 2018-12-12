import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { param } from 'express-validator/check';
import { expertsStore } from '../../store/expert';
import { paramUserIdField } from '../helper';
import { SESSION_SECRET } from '../../util/env-vars';

export class GetProfile extends Controller implements IController {
  public validateRules: Array<any> = [];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const authUserId = req.user.sub;
    const expertId = req.user.profileId;
    const expert = await expertsStore.getExpert(expertId);
    renderDataSuccess(req, res, expert);
  }
}
