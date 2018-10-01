import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {renderDataSuccess} from '../../util/data-render';
import {expertsStore} from "../../store/expert";

export class AllExperts extends Controller implements IController {
  constructor() {
    super();
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const allExperts = await expertsStore.getExperts();
    renderDataSuccess(req, res, allExperts);
  }
}