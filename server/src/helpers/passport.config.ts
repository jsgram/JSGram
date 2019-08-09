import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt';

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


passport.use(
  'local',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, function (username, password, done) {
    User.findOne({email: username}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          return done(null, user);
        } else {
          return done(err, false, {message: 'Incorrect'});
        }
      });
    });
  }));

passport.serializeUser<any, any>(function (user, done) { // FIXME types
  done(null, user.username);
});

passport.deserializeUser(function (id, done) {
  done(null, false);
});
