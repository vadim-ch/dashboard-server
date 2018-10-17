import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {renderDataSuccess} from '../../util/data-render';
import {clientStore} from '../../store/client';

export class AllUsers extends Controller implements IController {
  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const allExperts = await clientStore.getUsers();
    renderDataSuccess(req, res, allExperts);
  }
}
