import {Request, Response} from 'express';
import {validationResult} from 'express-validator/check';
import * as passport from 'passport'

export const validateMiddleware = (req: Request, res: Response, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    next();
};

export const isAuthenticated = passport.authenticate('jwt', {session: false});