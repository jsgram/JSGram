import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import {IUserModel, User} from '../../models/user.model';


export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local',
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/auth/error');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/auth/');
      });
    })(req, res, next);
};
