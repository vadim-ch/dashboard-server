import { isAuthenticated, userRolesMiddleware, validateMiddleware } from '../routes/middlewares';
import { Request, Response } from 'express';
import { param } from 'express-validator/check';
import { asyncHandler } from '../util/async-handler';
import { NotFoundError } from '../errors/not-found-error';
import { renderDataSuccess } from '../util/data-render';
import { userStore, UserUpdateFields } from '../store/users';

const validateField = [
  param('id').isString().isBase64().isLength({min: 5}),
];

const getUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userStore.getUserById(userId);
  if (!user) {
    throw new NotFoundError(`User "${userId}" not found`);
  }
  renderDataSuccess(req, res, user);
});

const putUserController = asyncHandler(async (req: Request, res: Response, next: (data?: any) => void) => {
  const userId = req.params.id;
  let updateData: UserUpdateFields = {};
  if (req.body.firstName) {
    updateData.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    updateData.lastName = req.body.lastName;
  }
  const user = await userStore.findAndUpdateUser(userId, updateData);
  if (!user) {
    throw new NotFoundError(`User "${userId}" not found`);
  }
  renderDataSuccess(req, res, user);
});

const getAllExpertsController = asyncHandler(async (req: Request, res: Response, next: (data?: any) => void) => {
  const allExperts = await userStore.getAllExperts();
  renderDataSuccess(req, res, allExperts);
});

const getAllUsersController = asyncHandler(async (req: Request, res: Response, next: (data?: any) => void) => {
  const allExperts = await userStore.getUsers();
  renderDataSuccess(req, res, allExperts);
});


export const getUser = [
  // isAuthenticated,
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


export const getAllUsers = [
  // isAuthenticated,
  getAllUsersController
];
