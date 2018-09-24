import {Request, Response} from 'express';
import {check} from 'express-validator/check';
import {logger} from '../../config/winston';
import {User} from '../db/models/user';
import {isAuthenticated, validateMiddleware} from '../routes/middlewares';
import {tokenGenerator} from "../util/token-generator";
import * as passport from 'passport'

const validateSigninFields = [
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({min: 5})
];

const validateSignupFields = [
    ...validateSigninFields,
    check('username').isLength({min: 2}),
];

const userLoginHandler = (user, req, res, next) => {
    return (err) => {
        if (err) {
            return next(err);
        }
        const preparedUser = {
            username: user.username,
            email: user.email,
            id: user._id
        };
        const token = tokenGenerator.sign(preparedUser);
        return res.status(200).json({
            response: preparedUser,
            token
        });
    }
};

const signupController = async(req: Request, res: Response, next: (data?: any) => void) => {
    try {
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(422).json({errors: 'Exist user'});
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        try {
            req.login(user, {session: false}, userLoginHandler(user, req, res, next));
        } catch (err) {
            logger.error(err);
            return res.status(422).json({errors: 'New user login fail'});
        }
        await user.save();
    } catch(err) {
        if (err) {
            logger.error(err);
            return res.status(422).json({errors: err});
        }
    }
};

export const signinController = (req: Request, res: Response, next: (data?: any) => void) => {
    // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (user) {
            req.login(user, {session: false}, userLoginHandler(user, req, res, next));
        } else {
            return res.status(422).json({errors: info});
        }
    })(req, res, next);
};

export const logoutController = async (req, res, next) => {
    await req.logout();
    next();
};

export const refreshTokenController = async (req, res, next) => {
    next();
};

export const signup = [
    validateSignupFields,
    validateMiddleware,
    signupController
];

export const signin = [
    validateSigninFields,
    validateMiddleware,
    signinController
];

export const logout = [
    isAuthenticated,
    logoutController
];

export const refreshToken = [
    isAuthenticated,
    refreshTokenController
];