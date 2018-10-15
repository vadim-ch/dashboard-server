import {renderDataSuccess} from '../../util/data-render';
import {tokenGenerator} from '../../util/token-generator';
import {IExpertModel} from "../../store/models/expert";
import {ExpertsStore} from '../../store/expert';
import { Expert } from '../../entity/Expert';

export const expertLoginHandler = (expert: Expert, req, res, next) => {
  return async (err) => {
    if (err) {
      return next(err);
    }
    const preparedExpert = ExpertsStore.prepareExpert(expert);
    const accessToken = await tokenGenerator.makeAccessToken(preparedExpert);
    const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(preparedExpert);
    // expert.refreshTokenMap = {
    //   ...expert.refreshTokenMap,
    //   [refreshUuid]: refreshToken
    // };
    // await expert.save();
    renderDataSuccess(req, res, {
      accessToken,
      refreshToken
    });
  }
};
