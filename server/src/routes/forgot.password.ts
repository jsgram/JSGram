import {Router} from 'express';
// tslint:disable-next-line:max-line-length
import {checkEmail} from '../controllers/forgot.password.controllers/check.email';
// tslint:disable-next-line:max-line-length
import {resetPassword} from '../controllers/forgot.password.controllers/reset.password';
// tslint:disable-next-line:max-line-length
import {updatePassword} from '../controllers/forgot.password.controllers/update.password';

export const forgotPassword = Router();

forgotPassword.get('/:token', resetPassword);
forgotPassword.post('/', checkEmail);
forgotPassword.put('/:token', updatePassword);
