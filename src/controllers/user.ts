import {isAuthenticated} from '../routes/middlewares';
import {Request, Response} from 'express';
import {User} from '../db/models/user';
import {logger} from '../../config/winston';
// import {Error} from 'mongoose';
import {param, validationResult} from 'express-validator/check';

const validateField = [
    param('id').isString().isBase64().isLength({min: 5}),
];

const getUserController = async(req: Request, res: Response, next: (data?: any) => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('user is not defined');
        }
        return res.json({response: user});
    } catch (err) {
        logger.error(err);
        return res.status(422).json({error: err});
    }
};

const putUserController = async(req: Request, res: Response, next: (data?: any) => void) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(401);
        }

        // only update fields that were actually passed...
        if (typeof req.body.user.username !== 'undefined') {
            user.username = req.body.user.username;
        }
        if (typeof req.body.user.email !== 'undefined') {
            user.email = req.body.user.email;
        }
        // if(typeof req.body.user.bio !== 'undefined'){
        //   user.bio = req.body.user.bio;
        // }
        // if(typeof req.body.user.image !== 'undefined'){
        //   user.image = req.body.user.image;
        // }
        // if(typeof req.body.user.password !== 'undefined'){
        //   user.setPassword(req.body.user.password);
        // }

        await user.save();
        return res.status(200).json({
            response: {
                ...user,
                id: user._id
            }
        });
    } catch (err) {
        next(err);
    }
};

export const getUser = [
    validateField,
    isAuthenticated,
    getUserController
];

export const putUser = [
    isAuthenticated,
    putUserController
];