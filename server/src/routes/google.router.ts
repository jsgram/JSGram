import {Router} from 'express';
import passport from 'passport';

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
            failureRedirect: '/bad',
            session: false,
        }),
    function(req: any, res: any) {
        res.redirect('/good');
    });

googleRouter.get('/good', (req: any, res: any) => res.send('good'));
googleRouter.get('/bad', (req: any, res: any) => res.send('bad'));
