import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { asyncRouteHandler } from '../../util/async';
import { usersStore } from './store';
import { Router } from 'express';

export const usersRouter = Router();

usersRouter.use(bodyParser.json());

usersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const upload = multer({storage: multer.memoryStorage()});

const toPage = async (users, skip = 0, limit = 20) => {
  // implement paginate
  return {
    data: await (users),
    // skip,
    // limit,
    // total: await cursor.count()
  };
};

usersRouter.get(``,
    asyncRouteHandler(
        async (req, res) => res.json(
            await toPage(
                await usersStore.getAllUsers()
            )
        )
    )
);
