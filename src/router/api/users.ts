import {check, validationResult, param} from 'express-validator/check'
import * as passport from 'passport'
import {User} from '../../models/user';
import {logger} from '../../../config/winston';
import {Error} from 'mongoose';
import * as jwt from 'jsonwebtoken';
import {SESSION_SECRET} from "../../util/secret";
import {jsonWebTokenOptions} from "../../passport";

const isAuthenticated = passport.authenticate('jwt', {session: false});

export const routerUsers = (router) => {
    router.get('/:id',
        [
            param('id').isString().isBase64().isLength({min: 5}),
        ],
        isAuthenticated,
        async (req, res, next) => {
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
        });

    router.put('/:id', isAuthenticated, async (req, res, next) => {
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
    });

    router.post('/login', [
        check('email').isEmail(),
        check('password').isLength({min: 5})
    ], (req: any, res, next) => {
        // req.assert('email', 'Email is not valid').isEmail();
        // req.assert('password', 'Password cannot be blank').notEmpty();
        // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (user) {
                req.login(user, {session: false}, (err) => {
                    if (err) {
                        return next(err);
                    }
                    const preparedUser = {
                        username: user.username,
                        email: user.email,
                        id: user._id
                    };
                    const token = jwt.sign(preparedUser, SESSION_SECRET, jsonWebTokenOptions);
                    return res.status(200).json({
                        response: preparedUser,
                        token
                    });
                });
            } else {
                return res.status(422).json({errors: info});
            }
        })(req, res, next);
    });

    router.post('/register', [
        // username must be an email
        check('username').isLength({min: 2}),
        check('email').isEmail(),
        // password must be at least 5 chars long
        check('password').isLength({min: 5})
    ], (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        User.findOne({email: req.body.email}, async (err, existingUser, info) => {
            if (err) {
                logger.error(err);
                return next(err);
            }
            if (existingUser) {
                return res.status(422).json({errors: info});
            }
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            try {
                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                });
            } catch (err) {
                logger.error(err);
                return next(err);
            }
            await user.save();
        });
    });

    router.post('/logout', isAuthenticated, async (req, res, next) => {
        await req.logout();
        next();
    });
    return router;
};
