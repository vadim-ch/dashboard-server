import {Request, Response} from 'express';
import {validationResult} from 'express-validator/check';
import * as passport from 'passport'
import * as expressJwt from 'express-jwt'
import { SESSION_SECRET } from '../../util/secret';

export const validateMiddleware = (req: Request, res: Response, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validare error', req);
        return res.status(422).json({errors: errors.array()});
    }
    next();
};

export const isAuthenticated = expressJwt({secret: SESSION_SECRET});
// export const isAuthenticated = passport.authenticate('jwt', {session: false});

