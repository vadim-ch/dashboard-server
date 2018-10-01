import {Controller, IController} from '../';
import {Request, Response} from 'express';
import {renderDataSuccess} from '../../util/data-render';
import {tokenGenerator} from '../../util/token-generator';
import {UserStore} from '../../store/users';
import {NotFoundError} from '../../errors/not-found-error';

export class RefreshTokenExpert extends Controller implements IController {
  public validateRules: Array<any> = [

  ];

  constructor() {
    super();
  }

  public validate(req: Request, res: Response, next): void {

  }


  public async run(req: Request, res: Response, next: (data?: any) => void) {
    // TODO prichesat. privesti k ostalnim handleram
    const user = await req.user;
    if (!user) {
      throw new NotFoundError(`User '${user._id}' not found`);
    }
    const decodedRefreshToken = await tokenGenerator.verifyToken(req.body.refreshToken);
    if (user.refreshTokenMap[decodedRefreshToken['jwtid']]) {
      delete user.refreshTokenMap[req.body.refreshToken];
      const preparedUser = UserStore.prepareUser(user);
      const newAccessToken = await tokenGenerator.makeAccessToken(preparedUser);
      const [newRefreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(preparedUser);
      user.refreshTokenMap = {
        ...user.refreshTokenMap,
        [refreshUuid]: newRefreshToken
      };
      await user.save();
      renderDataSuccess(req, res, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    }
    next();
  }
}