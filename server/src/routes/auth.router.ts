import {Router, Request, Response} from 'express';
import {login} from '../controllers/auth.controllers/login';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', (req: Request, res: Response) => {
    req.logout();
    res.redirect('/');
});
