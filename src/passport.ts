import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';
import {hash, compare} from 'bcrypt';
import {User} from './models/user';
import {SESSION_SECRET} from "./util/secret";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


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

const jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
const secretOrKey = SESSION_SECRET;
export const jsonWebTokenOptions = {
    expiresIn: 30
};

passport.use(new JWTStrategy({jwtFromRequest, secretOrKey, jsonWebTokenOptions}, async (jwtPayload, done) => {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    try {
        const user = await User.findById(jwtPayload.id);
        // User not found
        if (!user) {
            console.log('User not found');
            return done(null, false)
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));