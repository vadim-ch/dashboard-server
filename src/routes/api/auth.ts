import * as express from 'express'
import { renderException } from '../../util/data-render';
import { logout, refreshToken, signin, signup } from '../../controllers/auth';

const authRouter = express.Router();

export const authUsers = () => {
  authRouter.post('/login', ...signin);
  authRouter.post('/register', ...signup);
  authRouter.post('/logout', ...logout);
  authRouter.post('/refresh-token', ...refreshToken);

  authRouter.use((exception, req, res, next) => {
    renderException(req, res, exception);
    next();
  });

  return authRouter;
};
