import { Controller, IController } from '../';
import { Request, Response } from 'express';
import * as path from 'path';
import { renderDataSuccess } from '../../util/data-render';
import { param } from 'express-validator/check';
import { SESSION_SECRET } from '../../util/env-vars';
import { expertsStore } from '../../store/expert';
import { paramUserIdField } from '../helper';
import { UserCheckerType } from '../index';
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/avatars');
  },
  filename: (req, file, cb) => {
    const authUserId = req.user.sub;
    cb(null, `${authUserId}${path.extname(file.originalname)}`);
  }
});

const upload = multer({storage}); // TODO добавить валидацию файлов

export class PutProfile extends Controller implements IController {
  public beforeRequest: Array<any> = [
    upload.single('avatar')
  ];

  public validateRules: Array<any> = [];

  constructor() {
    super(SESSION_SECRET);
  }

  public async run(req: Request, res: Response, next: (data?: any) => void) {
    const authUserId = req.user.sub;
    const expertId = req.user.profileId;
    const requestData = req.body;
    let updateData: any = {};
    if (requestData.firstName) {
      updateData.firstName = requestData.firstName;
    }
    if (requestData.lastName) {
      updateData.lastName = requestData.lastName;
    }
    if (requestData.middleName) {
      updateData.middleName = requestData.middleName;
    }
    if (requestData.birthday) {
      updateData.birthday = requestData.birthday;
    }
    if (requestData.gender) {
      updateData.gender = requestData.gender;
    }
    if (requestData.qualifications) {
      updateData.qualifications = requestData.qualifications;
    }
    if (requestData.directionsTherapy) {
      updateData.directionsTherapy = requestData.directionsTherapy;
    }
    if (requestData.approachesTherapy) {
      updateData.approachesTherapy = requestData.approachesTherapy;
    }
    if (requestData.methodsTherapy) {
      updateData.methodsTherapy = requestData.methodsTherapy;
    }
    if (requestData.requestsTherapy) {
      updateData.requestsTherapy = requestData.requestsTherapy;
    }
    if (req.file) {
      updateData.avatar = req.file.filename
    }
    // updateData.methodsTherapy = [{id: 1}];
    const expert = await expertsStore.findAndUpdateExpert(authUserId, expertId, updateData);
    renderDataSuccess(req, res, expert);
  }
}
