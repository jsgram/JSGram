import { Router } from 'express';
import { login } from '../../controllers/auth.controllers/login';
import { logout } from '../../controllers/auth.controllers/logout';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
