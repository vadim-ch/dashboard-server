import { isAuthenticated, userRolesMiddleware, validateMiddleware } from '../routes/middlewares';
import { Request, Response } from 'express';
import { User, UserRole } from '../db/models/user';
import { logger } from '../../config/winston';
// import {Error} from 'mongoose';
import { param, validationResult } from 'express-validator/check';

const validateField = [
  param('id').isString().isBase64().isLength({min: 5}),
];

const getUserController = async (req: Request, res: Response, next: (data?: any) => void) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('user is not defined');
    }
    const preparedUser = {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
      role: user.role
    };
    return res.json({...preparedUser});
  } catch (err) {
    logger.error(err);
    return res.status(422).json({error: err});
  }
};

const putUserController = async (req: Request, res: Response, next: (data?: any) => void) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(401);
    }

    // only update fields that were actually passed...
    if (req.body.username) {
      user.username = req.body.username;
    }
    // if (req.body.email) {
    //   user.email = req.body.email;
    // }
    // if(typeof req.body.user.bio !== 'undefined'){
    //   user.bio = req.body.user.bio;
    // }
    // if(typeof req.body.user.image !== 'undefined'){
    //   user.image = req.body.user.image;
    // }
    // if(typeof req.body.user.password !== 'undefined'){
    //   user.setPassword(req.body.user.password);
    // }

    await user.save();
    const preparedUser = {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
      role: user.role
    };
    return res.json({...preparedUser});
  } catch (err) {
    next(err);
  }
};

const getAllExpertsController = async (req: Request, res: Response, next: (data?: any) => void) => {
  try {
    const allExperts = await User.find({role: UserRole.Expert});
    return res.json(allExperts.map(user => {
      return {
        username: user.username,
        email: user.email,
        id: user._id.toString(),
        role: user.role
      };
    }));
  } catch (err) {
    logger.error(err);
    return res.status(422).json({error: err});
  }
};


export const getUser = [
  isAuthenticated,
  validateField,
  validateMiddleware,
  getUserController
];

export const putUser = [
  isAuthenticated,
  userRolesMiddleware,
  putUserController
];

export const getAllExperts = [
  // isAuthenticated,
  getAllExpertsController
];
