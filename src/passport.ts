import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import {User} from './store/models/user';

const LocalStrategy = passportLocal.Strategy;
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

const usernameField = 'email';
passport.use(new LocalStrategy({usernameField}, (email, password, done) => {
    User.findOne({email: email.toLowerCase()}, async (err, user) => {
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
        } catch (err) {
            return done(err);
        }
    });
}));
