import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import * as expressJwt from 'express-jwt'
import { SESSION_SECRET } from '../../util/env-vars';
import { MongoError } from 'mongodb';


export const validateMiddleware = (req: Request, res: Response, next: () => void) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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
