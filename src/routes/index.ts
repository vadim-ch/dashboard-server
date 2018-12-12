import * as express from 'express'
import * as passport from 'passport'
import { UsersRouter } from './users-router';
import { ExpertsRouter } from './experts-router';
import { AuthRouter } from './auth-router';
import { SuggestRouter } from './suggest-router';
import { ProfileRouter } from './profile-router';

const router = express.Router();
const app = express();

export const routerInit = () => {
  app.use(require('method-override')());
  app.use(passport.initialize());

  router.use('/', new AuthRouter().router());
  // router.use('/users', new UsersRouter().router());
  router.use('/experts', new ExpertsRouter().router());
  router.use('/profile', new ProfileRouter().router());
  router.use('/suggest', new SuggestRouter().router());
  return router;
};
