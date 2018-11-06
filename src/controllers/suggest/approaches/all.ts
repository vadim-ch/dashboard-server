import { Controller, IController } from '../../index';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../../util/data-render';
import { suggestStore } from '../../../store/suggest';

export class AllApproaches extends Controller implements IController {
  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const all = await suggestStore.getAllApproaches();
    renderDataSuccess(req, res, all);
  }
}
