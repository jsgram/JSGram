import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import {User} from '../models/user.model';

passport.use(
    'register',
    new LocalStrategy(
        async (username, password, done) => {
            const user = await User.findOne({username});
            return done(null, user);
        },
    ),
);

passport.serializeUser<any, any>(function(user, done) { // FIXME types
    done(null, user.username);
});

passport.deserializeUser(function(id, done) {
    done(null, false);
});
