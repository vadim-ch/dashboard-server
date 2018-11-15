import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { NotFoundError } from "./errors/not-found-error";
import { AuthError } from "./errors/auth-error";
import { expertsStore } from "./store/expert";
import { userStore } from './store/user';

const LocalStrategy = passportLocal.Strategy;
export const userAuth = new passport.Passport();

userAuth.serializeUser((expert: any, done) => {
  done(null, expert.id);
});

userAuth.deserializeUser((id, done) => {
  userStore.getById(id as any)
      .then(expert => {
        done(null, expert);
      })
      .catch((err) => {
        done(err);
      });
});

userAuth.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  userStore.getByEmail(email.toLowerCase())
      .then(async (user) => {
        // Expert not found
        if (!user) {
          return done(new NotFoundError(`User "${email}" not found`), false);
        }
        try {
          const isMatch = await user.comparePassword(password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(new AuthError(`User "${email}" incorrect password`), false);
          }
        } catch (err) {
          return done(err);
        }
      })
      .then(err => {
        if (err) {
          return done(err)
        }
      });
}));
