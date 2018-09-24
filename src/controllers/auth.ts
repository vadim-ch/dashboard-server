import { Request, Response } from 'express';
import { check } from 'express-validator/check';
import { logger } from '../../config/winston';
import { User } from '../db/models/user';
import { isAuthenticated, validateMiddleware } from '../routes/middlewares';
import { tokenGenerator } from "../util/token-generator";
import * as passport from 'passport'
import * as jwt from 'jsonwebtoken';

const validateSigninFields = [
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({min: 5})
];

const validateSignupFields = [
  ...validateSigninFields,
  check('username').isLength({min: 2}),
];

const userLoginHandler = (user, req, res, next) => {
  return async(err) => {
    if (err) {
      return next(err);
    }
    const preparedUser = {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
      role: ''
    };
    const accessToken = await tokenGenerator.makeAccessToken(preparedUser);
    const refreshToken = await tokenGenerator.makeRefreshToken(preparedUser);
    user.refreshTokenMap = {
      [refreshToken]: refreshToken
    };
    user.save();
    return res.status(200).json({
      accessToken,
      refreshToken
    });
  }
};

const signupController = async (req: Request, res: Response, next: (data?: any) => void) => {
  try {
    const existingUser = await User.findOne({email: req.body.email});
    if (existingUser) {
      return res.status(422).json({errors: 'Exist user'});
    }
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    try {
      req.login(user, {session: false}, userLoginHandler(user, req, res, next));
    } catch (err) {
      logger.error(err);
      return res.status(422).json({errors: 'New user login fail'});
    }
    await user.save();
  } catch (err) {
    if (err) {
      logger.error(err);
      return res.status(422).json({errors: err});
    }
  }
};

export const signinController = (req: Request, res: Response, next: (data?: any) => void) => {
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
};

export const logoutController = async (req, res, next) => {
  await req.logout();
  return res.status(200);
};

export const refreshTokenController = async (req, res, next) => {
  const refreshTokenRequest = jwt.decode(req.body.refreshToken);
  const user = await User.findById(refreshTokenRequest.sub);
  if (!user) {
    throw new Error('user is not defined');
  }
  if (user.refreshTokenMap[req.body.refreshToken]) {
    delete user.refreshTokenMap[req.body.refreshToken];
    const preparedUser = {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
      role: ''
    };
    const newAccessToken = await tokenGenerator.makeAccessToken(preparedUser);
    const newRefreshToken = await tokenGenerator.makeRefreshToken(preparedUser);
    user.refreshTokenMap = {
      [newRefreshToken]: newRefreshToken
    };
    await user.save();
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  }
  res.status(422);
};

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
