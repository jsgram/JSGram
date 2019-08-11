import {Router} from 'express';
import passport from 'passport';

export const facebookRouter = Router();

facebookRouter.get('/auth/facebook',
    passport.authenticate(
        'facebook',
        {scope: ['email']},
        ));

facebookRouter.get('/auth/facebook/callback',
    passport.authenticate(
        'facebook',
        {
            successRedirect: '/good',
            failureRedirect: '/bad',
            session: false,
        }));

facebookRouter.get('/good', (req: any, res: any) => res.send('good'));
facebookRouter.get('/bad', (req: any, res: any) => res.send('bad'));
