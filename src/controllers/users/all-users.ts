import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {renderDataSuccess} from '../../util/data-render';
import {userStore} from '../../store/users';

export class AllUsers extends Controller implements IController {
  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const allExperts = await userStore.getUsers();
    renderDataSuccess(req, res, allExperts);
  }
}