import {Router} from 'express';
import {confirm} from '../controllers/confirm.user.controllers/confirm.token.controller';
import {resend} from '../controllers/confirm.user.controllers/resend.token.controller';

const confirmUserRouter = Router();

confirmUserRouter.get('/:token', confirm);
confirmUserRouter.post('/', resend);

export {confirmUserRouter};
