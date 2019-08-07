import {NextFunction, Request, Response} from 'express';
import passport from 'passport';


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
