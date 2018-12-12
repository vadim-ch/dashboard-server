import { Controller, IController } from '../';
import { Request, Response } from 'express';
import { renderDataSuccess } from '../../util/data-render';
import { tokenGenerator } from '../../util/token-generator';
import { NotFoundError } from '../../errors/not-found-error';
import { UserStore } from '../../store/user';

export class RefreshToken extends Controller implements IController {
  public validateRules: Array<any> = [];

  constructor() {
    super();
  }

  public validate(req: Request, res: Response, next): void {

  }


  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // TODO prichesat. privesti k ostalnim handleram
    const expert = req.user;
    if (!expert) {
      throw new NotFoundError(`Expert '${expert.id}' not found`);
    }
    // const decodedRefreshToken = await tokenGenerator.verifyToken(req.body.refreshToken);
    // if (expert.refreshTokenMap[decodedRefreshToken['jwtid']]) {
    //   delete expert.refreshTokenMap[req.body.refreshToken];
    //   const preparedExpert = UserStore.prepareUser(expert);
    //   const newAccessToken = await tokenGenerator.makeAccessToken(preparedExpert);
    //   const [newRefreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(preparedExpert);
    //   expert.refreshTokenMap = {
    //     ...expert.refreshTokenMap,
    //     [refreshUuid]: newRefreshToken
    //   };
    //   await expert.save();
    //   renderDataSuccess(req, res, {
    //     accessToken: newAccessToken,
    //     refreshToken: newRefreshToken
    //   });
    // }
    next();
  }
}
