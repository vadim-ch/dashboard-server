import * as express from 'express'
import { getAllExperts, getAllUsers, getUser, putUser } from '../../controllers/user';
import { renderException } from '../../util/data-render';

const userRouter = express.Router();

export const routerUsers = () => {
  userRouter.get('', ...getAllUsers);
  userRouter.get('/:id', ...getUser);
  userRouter.put('/:id', ...putUser);
  // router.delete('/:id', );

  userRouter.use((exception, req, res, next) => {
    renderException(req, res, exception);
    next();
  });

  return userRouter;
};
