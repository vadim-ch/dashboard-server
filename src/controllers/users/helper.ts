import {renderDataSuccess} from '../../util/data-render';
import {IUserModel} from '../../store/models/user';
import {tokenGenerator} from '../../util/token-generator';
import {UserStore} from '../../store/users';

export const userLoginHandler = (user: IUserModel, req, res, next) => {
  return async (err) => {
    if (err) {
      return next(err);
    }
    const preparedUser = UserStore.prepareUser(user);
    const accessToken = await tokenGenerator.makeAccessToken(preparedUser);
    const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(preparedUser);
    user.refreshTokenMap = {
      ...user.refreshTokenMap,
      [refreshUuid]: refreshToken
    };
    await user.save();
    renderDataSuccess(req, res, {
      accessToken,
      refreshToken
    });
  }
};