import * as express from 'express'
import { routerUsers } from './api/users';
import * as passport from 'passport'
import { authUsers } from './api/auth';
import { getAllExperts } from '../controllers/user';
const router = express.Router();
const app = express();

export const routerInit = () => {
  app.use(require('method-override')());
  app.use(passport.initialize());

  router.get('/experts', ...getAllExperts);
  router.use('/users', routerUsers());
  router.use('/auth', authUsers());
  return router;
};
