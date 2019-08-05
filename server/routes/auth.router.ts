import {Router} from 'express';
import {register} from '../controllers/auth.controllers/register';

const authRouter = Router();

authRouter.post('/register', register);
export {authRouter};
