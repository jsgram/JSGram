import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { encodeJWT } from "../../helpers/jwt.encoders";
import { IUserModel } from "../../models/user.model";

export const login = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate("local", function(err: Error, user: IUserModel): any {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/error");
    }
    req.logIn(user, function(error: Error): any {
      if (error) {
        return next(error);
      }
      const token = encodeJWT(req.body.email, process.env.SECRET_KEY!);
      return res.json({ token });
    });
  })(req, res, next);
};
