import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { param } from 'express-validator/check';
import { SESSION_SECRET } from '../../util/env-vars';
import { expertsStore } from '../../store/expert';
import { paramUserIdField } from '../helper';
import { UserCheckerType } from '../index';
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const checkUserRules: UserCheckerType = {
  paramUserIdField,
};

export class PutExpertById extends Controller implements IController {
  public beforeRequest: Array<any> = [
    upload.single('avatar')
  ];
  public validateRules: Array<any> = [
    param(paramUserIdField).isString().isLength({min: 5}),
  ];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const authUserId = req.user.sub;
    const {expertId} = req.params;
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
    if (req.body.birthday) {
      updateData.birthday = req.body.birthday;
    }
    if (req.body.gender) {
      updateData.gender = req.body.gender;
    }
    if (req.body.qualifications) {
      console.error(req.body.qualifications);
      console.error(typeof req.body.qualifications);
      console.error(JSON.parse(req.body.qualifications));
      updateData.qualifications = JSON.parse(req.body.qualifications);
    }
    // updateData.methodsTherapy = [{id: 1}];
    const expert = await expertsStore.findAndUpdateExpert(authUserId, expertId, updateData);
    renderDataSuccess(req, res, expert);
  }
}
