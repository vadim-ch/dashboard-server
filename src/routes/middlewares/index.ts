import { Request, Response } from 'express';

export const userRolesMiddleware = (req: Request, res: Response, next: () => void) => {
  if (req.user.sub !== req.params.id) {
    return res.status(403).json({errors: 'not owned by user'});
  }
  next();
};
