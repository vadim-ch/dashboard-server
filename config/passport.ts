import * as passport from 'passport';
import * as passportLocal from 'passport-local';
const bcrypt = require('bcrypt')

const LocalStrategy = passportLocal.Strategy;



passport.serializeUser(function(user, done) {
  console.error(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null, user);
});

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const myPlaintextPassword = 'my-password'
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)
const user = {
  email: 'vadim.ch+1@livetex.ru',
  username: 'vadim.ch+1@livetex.ru',
  passwordHash,
  id: 1
}

export function findById (id, callback) {
  console.error(id);
  console.error(user.id);
  console.error(typeof id);
  console.error(typeof user.id);
  console.error(id === user.id);
  if (Number(id) === Number(user.id)) {
    return callback(null, user)
  }
  return callback(null)
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  findUser(email, (err, user) => {
    if (err) {
      return done(err)
    }

    // User not found
    if (!user) {
      console.log('User not found')
      return done(null, false)
    }

    // Always use hashed passwords and fixed time comparison
    bcrypt.compare(password, user.passwordHash, (err, isValid) => {
      if (err) {
        return done(err)
      }
      if (!isValid) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
}));
