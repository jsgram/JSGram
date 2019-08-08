import {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import {encodeJWT} from '../../helpers/jwt.encoders';

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local',
    function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/auth/error');
      }
      req.logIn(user, function(error) {
        if (error) {
          return next(error);
        }
        const token = encodeJWT(req.body.email, process.env.SECRET_KEY!);
        return res.json({token});
      });
    })(req, res, next);
};
