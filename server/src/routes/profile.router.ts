import { Router } from 'express';
import { getProfile } from '../controllers/profile.controllers/getProfile';
import { handlePhoto } from '../controllers/profile.controllers/handlePhoto';
import { isAuthorized } from '../controllers/auth.controllers/auth.isAuthorized';
import { editProfile } from '../controllers/profile.controllers/editProfile';
import { changeEmail } from '../controllers/profile.controllers/changeEmail';
import {confirmChangeEmail} from '../controllers/profile.controllers/confirm.change.email';

export const profileRouter = Router();

profileRouter.get('/', isAuthorized, getProfile);

profileRouter.post('/photo', isAuthorized, handlePhoto);
profileRouter.put('/photo', isAuthorized, handlePhoto);
profileRouter.delete('/photo', isAuthorized, handlePhoto);

profileRouter.post('/edit', isAuthorized, editProfile);
profileRouter.post('/changeEmail', isAuthorized, changeEmail);

profileRouter.get('/confirm/:oldEmail/:email/:token', confirmChangeEmail);
