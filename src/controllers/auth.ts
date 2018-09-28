import { Request, Response } from 'express';
import { check } from 'express-validator/check';
import { User } from '../store/models/user';
import { isAuthenticated, validateMiddleware } from '../routes/middlewares';
import { tokenGenerator } from "../util/token-generator";
import * as passport from 'passport'
import * as jwt from 'jsonwebtoken';
import { logger } from '../logger';
import { asyncHandler } from '../util/async-handler';
import { userStore, UserType } from '../store/users';

const validateSigninFields = [
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({min: 5})
];

const validateSignupFields = [
  ...validateSigninFields,
  check('username').isLength({min: 2}),
];

const userLoginHandler = (user: UserType, req, res, next) => {
  return async (err) => {
    if (err) {
      return next(err);
    }
    const preparedUser = {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
      role: user.role
    };
    const accessToken = await tokenGenerator.makeAccessToken(preparedUser);
    const [refreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(preparedUser);
    user.refreshTokenMap = {
      [refreshUuid]: refreshToken
    };
    await user.save();
    return res.status(200).json({
      accessToken,
      refreshToken
    });
  }
};

const signupController = asyncHandler(async (req: Request, res: Response, next: (data?: any) => void) => {
  const user = userStore.createUser({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  });

  req.login(user, {session: false}, userLoginHandler(user, req, res, next));
});

export const signinController = asyncHandler(async (req: Request, res: Response, next: (data?: any) => void) => {
  // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) {
      return res.status(422).json({errors: err});
    }
    if (user) {
      req.login(user, {session: false}, userLoginHandler(user, req, res, next));
    } else {
      return res.status(422).json({errors: info});
    }
  })(req, res, next);
});

export const logoutController = asyncHandler(async (req, res, next) => {
  await req.logout();
  return res.json({message: 'User is logged out'});
});

export const refreshTokenController = asyncHandler(async (req, res, next) => {
  const refreshTokenRequest = jwt.decode(req.body.refreshToken);
  const user = await User.findById(refreshTokenRequest.sub);
  if (!user) {
    throw new Error('user is not defined');
  }
  const decodedRefreshToken = await tokenGenerator.verifyToken(req.body.refreshToken);

  if (user.refreshTokenMap[decodedRefreshToken['jwtid']]) {
    delete user.refreshTokenMap[req.body.refreshToken];
    const preparedUser = {
      username: '',
      email: user.email,
      id: user._id.toString(),
      role: user.role
    };
    const newAccessToken = await tokenGenerator.makeAccessToken(preparedUser);
    const [newRefreshToken, refreshUuid] = await tokenGenerator.makeRefreshToken(preparedUser);
    user.refreshTokenMap = {
      [refreshUuid]: newRefreshToken
    };
    await user.save();
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  }
  res.status(422);
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
