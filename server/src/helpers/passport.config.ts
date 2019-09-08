import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import bcrypt from 'bcrypt';

import {IUserModel} from '../models/user.model';
import {createGoogleUser} from './google.auth';
import {checkUserByProp} from '../db.requests/user.requests';
import {
    GOOGLE_CALLBACK_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from '../common.constants/google.constants';

passport.use(
    'register',
    new LocalStrategy(
        async (username: string, password: string, done: any): Promise<void> => {
            try {
                const user = await checkUserByProp(username, done);
                return done(null, user);
            } catch (e) {
                return done(e);
            }
        },
    ),
);

passport.use(
    'local',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email: string, password: string, done: any): Promise<void> => {

        try {
            const user = await checkUserByProp(email, done);
            if (!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password, (error: Error, result: boolean) => {
                if (result) {
                    return done(null, user);
                }
            });
        } catch (e) {
            return done(e);
        }
    }),
);

// tslint:disable ter-indent
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
    },
    // tslint:enable ter-indent
    async (accessToken: string, refreshToken: string, profile: any, done: any): Promise<void> => {
        const {email, name}: { email: string, name: string } = profile._json;
        try {
            const user = await checkUserByProp(email, done);
            if (!user) {
                const newUser = await createGoogleUser(email, name);
                return done(null, newUser);
            }
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }),
);

passport.serializeUser<IUserModel, any>((user: IUserModel, done: any) => { // FIXME types
    done(null, user.username);
});

passport.deserializeUser((id: IUserModel, done: any) => {
    done(null, false);
});
