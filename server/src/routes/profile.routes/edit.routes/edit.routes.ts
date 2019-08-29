import { Router } from 'express';
import { isAuthorized } from '../../../controllers/auth.controllers/auth.isAuthorized';
import { editProfile } from '../../../controllers/profile.controllers/edit.controllers/editProfile';
import { changeEmail } from '../../../controllers/profile.controllers/edit.controllers/changeEmail';
import { confirmChangeEmail } from '../../../controllers/profile.controllers/edit.controllers/confirm.change.email';

export const editRouter = Router();

editRouter.post('/edit', isAuthorized, editProfile);
editRouter.post('/changeEmail', isAuthorized, changeEmail);

editRouter.get('/confirm/:oldEmail/:email/:token', confirmChangeEmail);
