import {logout, signin, signup} from '../../controllers/auth';
import {getUser, putUser} from '../../controllers/user';

export const routerUsers = (router) => {
    router.get('/:id', ...getUser);
    router.put('/:id', ...putUser);
    router.post('/login', ...signin);
    router.post('/register', ...signup);
    router.post('/logout', ...logout);
    return router;
};
