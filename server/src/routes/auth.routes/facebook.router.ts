import { Router } from 'express';
import passport from 'passport';
import { encodeJWT } from '../../helpers/jwt.encoders';

export const facebookRouter = Router();

facebookRouter.get('/auth/facebook/callback', (req: any, res: any, next: any) => {
    passport.authenticate('facebook', (err: any, user: any) => {
        if (!user) {
            return res.redirect(`${process.env.FRONT_PATH}/register/${encodeURIComponent(err.message)}`);
        }
        const token = encodeJWT(user.email, process.env.SECRET_KEY!);
        res.redirect(`${process.env.FRONT_PATH}/login/${token}`);
    })(req, res, next);
});

facebookRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
