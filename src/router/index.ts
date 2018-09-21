import * as express from 'express'
import { routerUsers } from './api/users';

export const routerInit = () => {
  const router = express.Router();
  // router.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello World!'
  //   });
  // });

  router.use('/user', routerUsers(router));
  return router;
};
