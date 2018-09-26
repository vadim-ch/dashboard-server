import { logout, refreshToken, signin, signup } from '../../controllers/auth';
import { getAllExperts, getUser, putUser } from '../../controllers/user';

export const routerUsers = (router) => {
    router.get('/user/:id', ...getUser);
    router.put('/user/:id', ...putUser);
    return router;
};
