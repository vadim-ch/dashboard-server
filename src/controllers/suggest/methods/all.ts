import { Controller, IController } from '../../index';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../../util/data-render';
import { suggestStore } from '../../../store/suggest';

export class AllMethods extends Controller implements IController {
  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const all = await suggestStore.getAllMethods();
    renderDataSuccess(req, res, all);
  }
}
