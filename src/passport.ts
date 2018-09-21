import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { hash, compare } from 'bcrypt';
import { User } from './models/user';

const LocalStrategy = passportLocal.Strategy;



passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// const saltRounds = 10
// const salt = bcrypt.genSaltSync(saltRounds)
// const myPlaintextPassword = 'my-password'
// const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)
// const user = {
//   email: 'vadim.ch+1@livetex.ru',
//   username: 'vadim.ch+1@livetex.ru',
//   passwordHash,
//   id: 1
// }

// export function findById (id, callback) {
//   if (Number(id) === Number(user.id)) {
//     return callback(null, user)
//   }
//   return callback(null)
// }
//
// function findUser (username, callback) {
//   if (username === user.username) {
//     return callback(null, user)
//   }
//   return callback(null)
// }


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, async(err, user) => {
    if (err) {
      return done(err)
    }

    // User not found
    if (!user) {
      console.log('User not found')
      return done(null, false)
    }

    try {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch(err) {
      return done(err);
    }
  });
}));
