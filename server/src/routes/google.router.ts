import {Router} from 'express';
import passport from 'passport';
import {encodeJWT} from '../helpers/jwt.encoders';
import {GOOGLE_SCOPE_EMAIL, GOOGLE_SCOPE_PROFILE} from '../common.constants/google.constants';

export const googleRouter = Router();

googleRouter.get('/auth/google',
    passport.authenticate('google',
        {
            scope: [
                GOOGLE_SCOPE_PROFILE,
                GOOGLE_SCOPE_EMAIL,
            ],
        }));

googleRouter.get('/auth/google/callback',
    passport.authenticate('google',
        {
            failureRedirect: `${process.env.FRONT_PATH}/auth/login`,
            session: false,
        }),
    function(req: any, res: any): Response {
        const token = encodeJWT(req.body.email, process.env.SECRET_KEY!);
        return res.json({token});
    });