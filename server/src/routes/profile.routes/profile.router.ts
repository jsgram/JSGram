import { Router } from 'express';
import { getProfile } from '../../controllers/profile.controllers/getProfile';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { photoRouter } from './photo.routes/photo.routes';
import { editRouter } from './edit.routes/edit.routes';

export const profileRouter = Router();

profileRouter.get('/:page', isAuthorized, getProfile);

profileRouter.use('/', editRouter);
profileRouter.use('/photo', photoRouter);
