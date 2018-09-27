import {Request, Response} from 'express';
import {validationResult} from 'express-validator/check';
import * as expressJwt from 'express-jwt'
import { SESSION_SECRET } from '../../util/secret';
import {MongoError} from "mongodb";

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

export const userRolesMiddleware = (req: Request, res: Response, next: () => void) => {
  if (req.user.sub !== req.params.id) {
    return res.status(403).json({errors: 'not owned by user'});
  }
  next();
};

// error Handlers

export const unauthorizedHandlerError = (err, req: Request, res: Response, next: () => void) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({errors: 'Error: invalid token'});
    }
};

export const dbHandlerError = (err, req: Request, res: Response, next: (data: any) => void) => {
    if (err instanceof MongoError) {
        return res.status(503).json({
            type: 'MongoError',
            message: err.message
        });
    }
    next(err);
};
