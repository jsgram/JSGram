import {Router} from 'express';
// tslint:disable-next-line:max-line-length
import {confirm} from '../controllers/confirm.user.controllers/confirm.token.controller';
// tslint:disable-next-line:max-line-length
import {resend} from '../controllers/confirm.user.controllers/resend.token.controller';

export const confirmUserRouter = Router();

confirmUserRouter.get('/:token', confirm);
confirmUserRouter.post('/', resend);
