import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import bcrypt from 'bcrypt';

import {IUserModel, User} from '../models/user.model';
import {createGoogleUser} from './google.auth';

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any): Promise<void> => {
    try {

      const {email, name}: { email: string, name: string } = profile._json;
      User.findOne({email}, (err: Error, user: IUserModel) => {
        if (!user) {
          const newUser = createGoogleUser(email, name);
          return done(null, newUser);
        }

        return done(null, user);
      });
    } catch (e) {
      return done(e);
    }
  }));

passport.serializeUser<any, any>((user: IUserModel, done: any) => { // FIXME types
  done(null, user.username);
});

passport.deserializeUser((id: IUserModel, done: any) => {
  done(null, false);
});
