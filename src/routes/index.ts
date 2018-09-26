import * as express from 'express'
import { routerUsers } from './api/users';
import { getAllExperts } from '../controllers/user';
import { logout, refreshToken, signin, signup } from '../controllers/auth';

export const routerInit = () => {
  const router = express.Router();
  // router.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello World!'
  //   });
  // });

  router.use('/user', routerUsers(router));

  // auth
  router.post('/auth/login', ...signin);
  router.post('/auth/register', ...signup);
  router.post('/auth/logout', ...logout);
  router.post('/auth/refresh-token', ...refreshToken);

  router.get('/all-experts', ...getAllExperts);
  return router;
};
