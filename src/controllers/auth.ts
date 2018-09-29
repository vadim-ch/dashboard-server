import { Request, Response } from 'express';
import { check } from 'express-validator/check';
import {IUserModel, User} from '../store/models/user';
import { isAuthenticated, validateMiddleware } from '../routes/middlewares';
import { tokenGenerator } from "../util/token-generator";
import * as passport from 'passport'
import * as jwt from 'jsonwebtoken';
import { logger } from '../logger';
import { asyncHandler } from '../util/async-handler';
import {UserStore, userStore, UserType} from '../store/users';
import {renderDataSuccess} from "../util/data-render";
import {NotFoundError} from "../errors/not-found-error";
import {AuthError} from "../errors/auth-error";

const validateSigninFields = [
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({min: 5})
];

const validateSignupFields = [
  ...validateSigninFields,
  check('username').isLength({min: 2}),
];

const userLoginHandler = (user: IUserModel, req, res, next) => {
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

const signupController = asyncHandler(async (req: Request, res: Response, next: (data?: any) => void) => {
  const rawUser = await userStore.createNewUser({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  });
  req.login(rawUser, {session: false}, userLoginHandler(rawUser, req, res, next));
});

export const signinController = asyncHandler(async (req: Request, res: Response, next: (data?: any) => void) => {
  // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) {
      next(err);
    }
    if (user) {
      req.login(user, {session: false}, userLoginHandler(user, req, res, next));
    }
  })(req, res, next);
});

export const logoutController = asyncHandler(async (req, res, next) => {
  await req.logout();
  renderDataSuccess(req, res, {message: 'User is logged out'});
});

export const refreshTokenController = asyncHandler(async (req, res, next) => {
  // TODO prichesat. privesti k ostalnim handleram
  const user = await req.user;
  if (!user) {
    throw new NotFoundError(`User "${user._id}" not found`);
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
});

export const signup = [
  validateSignupFields,
  validateMiddleware,
  signupController
];

export const signin = [
  validateSigninFields,
  validateMiddleware,
  signinController
];

export const logout = [
  isAuthenticated,
  logoutController
];

export const refreshToken = [
  isAuthenticated,
  refreshTokenController
];
