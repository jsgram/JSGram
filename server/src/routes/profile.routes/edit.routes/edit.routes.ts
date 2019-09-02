import { Router } from 'express';
import { isAuthorized } from '../../../controllers/auth.controllers/auth.isAuthorized';
import { editProfile } from '../../../controllers/profile.controllers/edit.controllers/editProfile';
import { changeEmail } from '../../../controllers/profile.controllers/edit.controllers/changeEmail';
import { confirmChangeEmail } from '../../../controllers/profile.controllers/edit.controllers/confirm.change.email';
import { editPassword } from '../../../controllers/profile.controllers/editPassword';
import { editProfileSettings } from '../../../controllers/profile.controllers/editProfileSettings';

export const editRouter = Router();

editRouter.post('/edit', isAuthorized, editProfile);
editRouter.post('/changeEmail', isAuthorized, changeEmail);
editRouter.put('/:username/edit-password', isAuthorized, editPassword);
editRouter.put('/:username/edit-settings', isAuthorized, editProfileSettings);

editRouter.get('/confirm/:oldEmail/:email/:token', confirmChangeEmail);
