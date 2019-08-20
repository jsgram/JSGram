import { Router } from 'express';
import { getProfile } from '../controllers/profile.controllers/getProfile';
import { handlePhoto } from '../controllers/profile.controllers/handlePhoto';
import { isAuthorized } from '../controllers/auth.controllers/auth.isAuthorized';

export const profileRouter = Router();

profileRouter.get('/', isAuthorized, getProfile);

profileRouter.post('/photo', isAuthorized, handlePhoto);
profileRouter.put('/photo', isAuthorized, handlePhoto);
profileRouter.delete('/photo', isAuthorized, handlePhoto);