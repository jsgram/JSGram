import {Router} from 'express';
import passport from 'passport';
import {encodeJWT} from "../helpers/jwt.encoders";

export const googleRouter = Router();

googleRouter.get('/auth/google',
    passport.authenticate('google',
        {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ],
        }));

googleRouter.get('/auth/google/callback',
    passport.authenticate('google',
        {
            failureRedirect: process.env.FRONT_PATH + '/auth/login',
            session: false,
        }),
    function(req: any, res: any): Response {
        const token = encodeJWT(req.body.email, process.env.SECRET_KEY!);
        return res.json({token});
    });
