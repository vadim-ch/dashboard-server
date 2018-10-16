import {renderDataSuccess} from '../util/data-render';

export const loginHandler = (req, res, next, accessToken, refreshToken) => {
  return async (err) => {
    if (err) {
      return next(err);
    }

    renderDataSuccess(req, res, {
      accessToken,
      refreshToken
    });
  }
};
