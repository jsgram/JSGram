import {Router} from 'express';
import {checkEmail} from '../../controllers/forgot.password.controllers/check.email';
import {resetPassword} from '../../controllers/forgot.password.controllers/reset.password';
import {updatePassword} from '../../controllers/forgot.password.controllers/update.password';

export const forgotPassword = Router();

forgotPassword.get('/:token', resetPassword);
forgotPassword.post('/', checkEmail);
forgotPassword.put('/:token', updatePassword);
