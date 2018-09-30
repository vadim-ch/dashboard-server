import * as express from 'express'
import { routerUsers } from './api/users';
import * as passport from 'passport'
import {routerExperts} from "./api/experts";
const router = express.Router();
const app = express();

export const routerInit = () => {
  app.use(require('method-override')());
  app.use(passport.initialize());

  router.use('/users', routerUsers());
  router.use('/experts', routerExperts());
  return router;
};
