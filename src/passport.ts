import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import {User} from './store/models/user';
import {NotFoundError} from "./errors/not-found-error";
import {AuthError} from "./errors/auth-error";
import {Expert} from "./store/models/expert";

const LocalStrategy = passportLocal.Strategy;
export const clientAuth = new passport.Passport();
export const expertAuth = new passport.Passport();

clientAuth.serializeUser((user: any, done) => {
    done(null, user.id);
});

clientAuth.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

expertAuth.serializeUser((expert: any, done) => {
    done(null, expert.id);
});

expertAuth.deserializeUser((id, done) => {
    Expert.findById(id, (err, expert) => {
        done(err, expert);
    });
});

clientAuth.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email: email.toLowerCase()}, async (err, user) => {
        if (err) {
            return done(err)
        }

        // User not found
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
    });
}));


expertAuth.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    Expert.findOne({email: email.toLowerCase()}, async (err, user) => {
        if (err) {
            return done(err)
        }

        // User not found
        if (!user) {
            return done(new NotFoundError(`Expert "${email}" not found`), false);
        }

        try {
            const isMatch = await user.comparePassword(password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(new AuthError(`Expert "${email}" incorrect password`), false);
            }
        } catch (err) {
            return done(err);
        }
    });
}));
