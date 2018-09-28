import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { usersStore } from './domain/users/store';
import { logger } from './logger';
// import {User} from './db/models/user';

const LocalStrategy = passportLocal.Strategy;


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersStore.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const usernameField = 'email';
passport.use(new LocalStrategy({usernameField}, async (email, password, done) => {
  try {
    const user = await usersStore.getUserByEmail(email.toLowerCase());
    // User not found
    if (!user) {
      logger.info(`User ${email} not found`);
      return done(null, false)
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}));
