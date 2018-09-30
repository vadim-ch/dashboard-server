import * as express from 'express'
import { renderException } from '../../util/data-render';
import {getAllExperts} from "../../controllers/users";

const expertsRouter = express.Router();

export const routerExperts = () => {
  // authRouter.post('/login', ...signin);
  // authRouter.post('/register', ...signup);
  // authRouter.post('/logout', ...logout);
  // authRouter.post('/refresh-token', ...refreshToken);
  expertsRouter.get('/', ...getAllExperts);

  expertsRouter.use((exception, req, res, next) => {
    renderException(req, res, exception);
    next();
  });

  return expertsRouter;
};
