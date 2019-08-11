import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import bcrypt from 'bcrypt';
import {config} from 'dotenv';


import {IUserModel, User} from '../models/user.model';

passport.use(
  'register',
  new LocalStrategy(
    async (username: string, password: string, done: any): Promise<void> => {
      try {
        const user = await User.findOne({username});
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
  }, (username: string, password: string, done: any): void => {
    User.findOne({email: username}, (err: Error, user: IUserModel) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (error: Error, result: boolean) => {
        if (result) {
          return done(null, user);
        }
        return done(err, false, {message: 'Incorrect'});
      });
    });
  }));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
    profileFields: ['id', 'displayName', 'email'],
  },
  function(accessToken: any, refreshToken: any, profile: any, done: any) {
    console.log(profile._json);
    done(null, profile);
  },
));



passport.serializeUser<any, any>((user: IUserModel, done: any) => { // FIXME types
  done(null, user.username);
});

passport.deserializeUser((id: IUserModel, done: any) => {
  done(null, false);
});
