import {Router} from 'express'
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import {asyncRouteHandler} from '../../util/async';

const usersRouter = new Router();

usersRouter.use(bodyParser.json());

usersRouter.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
});

const upload = multer({storage: multer.memoryStorage()});

const toPage = async (cursor, skip = 0, limit = 20) => {
    return {
        data: await (cursor.skip(skip).limit(limit).toArray()),
        skip,
        limit,
        total: await cursor.count()
    };
};

usersRouter.get(
    ``,
    asyncRouteHandler(
        async (req, res) => res.send(
            await toPage(
                await wizardsRouter.wizardsStore.getAllWizards()
            )
        )
    )
);