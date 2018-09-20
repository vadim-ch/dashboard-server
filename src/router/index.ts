import * as express from 'express'
import {check, validationResult} from 'express-validator/check'
import * as passport from 'passport'
import { authenticationMiddleware } from './middlewares/auth-middleware';
import { findById } from '../../config/passport';

export const routerInit = () => {
  const router = express.Router();
  // router.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello World!'
  //   });
  // });

  router.get('/user', authenticationMiddleware(), function (req, res, next) {
    // User.findById(req.payload.id).then(function (user) {
    //   if (!user) {
    //     return res.sendStatus(401);
    //   }
    //
    //   return res.json({user: user.toAuthJSON()});
    // }).catch(next);
    findById(req.query.id, (_, user) => {
      if (!user) {
        return res.status(422).json('error');
      }

      return res.json({ response: user });
    });
  });

  // router.put('/user', auth.required, function(req, res, next){
  //   User.findById(req.payload.id).then(function(user){
  //     if(!user){ return res.sendStatus(401); }
  //
  //     // only update fields that were actually passed...
  //     if(typeof req.body.user.username !== 'undefined'){
  //       user.username = req.body.user.username;
  //     }
  //     if(typeof req.body.user.email !== 'undefined'){
  //       user.email = req.body.user.email;
  //     }
  //     if(typeof req.body.user.bio !== 'undefined'){
  //       user.bio = req.body.user.bio;
  //     }
  //     if(typeof req.body.user.image !== 'undefined'){
  //       user.image = req.body.user.image;
  //     }
  //     if(typeof req.body.user.password !== 'undefined'){
  //       user.setPassword(req.body.user.password);
  //     }
  //
  //     return user.save().then(function(){
  //       return res.json({user: user.toAuthJSON()});
  //     });
  //   }).catch(next);
  // });

  router.post('/users/login', [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ],(req: any, res, next) => {
    console.error(req.body);
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('password', 'Password cannot be blank').notEmpty();
    // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    passport.authenticate('local', {session: false}, function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.logIn(user, (err) => {
          if (err) { return next(err); }
          // req.flash('success', { msg: 'Success! You are logged in.' });
          // res.redirect(req.session.returnTo || '/');
          return res.status(200).json({ response: user });
        });
      } else {
        return res.status(422).json({ errors: info });
      }
    })(req, res, next);
  });

  // router.post('/users', function(req, res, next){
  //   var user = new User();
  //
  //   user.username = req.body.user.username;
  //   user.email = req.body.user.email;
  //   user.setPassword(req.body.user.password);
  //
  //   user.save().then(function(){
  //     return res.json({user: user.toAuthJSON()});
  //   }).catch(next);
  // });
  return router;
};
