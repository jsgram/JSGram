import {Router} from 'express';
import {login} from '../controllers/auth.controllers/login';

export const authRouter = Router();

authRouter.post('/login', login);
