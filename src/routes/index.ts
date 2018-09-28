import * as express from 'express'
// import { routerUsers } from './api/users';
// import { getAllExperts } from '../controllers/user';
// import { logout, refreshToken, signin, signup } from '../controllers/auth';
import { usersRouter } from '../domain/users/route';
const router = express.Router();

export const routerInit = () => {

  // router.use('/user', routerUsers());
  router.use('/users', usersRouter);

  // auth
  // router.post('/auth/login', ...signin);
  // router.post('/auth/register', ...signup);
  // router.post('/auth/logout', ...logout);
  // router.post('/auth/refresh-token', ...refreshToken);
  //
  // router.get('/all-experts', ...getAllExperts);
  return router;
};
