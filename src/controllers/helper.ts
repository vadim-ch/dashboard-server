import { renderDataSuccess } from '../util/data-render';
import { COOKIE_DOMAIN } from '../util/env-vars';

export const paramUserIdField = 'expertId';

export const loginHandler = (req, res, next, accessToken, refreshToken, isPasswordExist) => {
  return async (err) => {
    if (err) {
      return next(err);
    }
    res.cookie('at', accessToken, {httpOnly: true, domain: COOKIE_DOMAIN});
    res.cookie('rt', refreshToken, {httpOnly: true, domain: COOKIE_DOMAIN});
    renderDataSuccess(req, res, {
      isPasswordExist,
      accessToken,
      refreshToken
    });
  }
};
