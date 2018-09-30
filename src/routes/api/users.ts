import * as express from 'express'
import {getAllUsers, getUser, putUser} from '../../controllers/users';
import {renderException} from '../../util/data-render';
// import {logout, refreshToken, signin, signup} from '../../controllers/auth';

const userRouter = express.Router();

export const routerUsers = () => {
  userRouter.get('', ...getAllUsers);
  userRouter.get('/:id', ...getUser);
  userRouter.put('/:id', ...putUser);
  // router.delete('/:id', );

  // userRouter.post('/login', ...signin);
  // userRouter.post('/register', ...signup);
  // userRouter.post('/logout', ...logout);
  // userRouter.post('/refresh-token', ...refreshToken);

  userRouter.use((exception, req, res, next) => {
    renderException(req, res, exception);
    next();
  });

  return userRouter;
};
