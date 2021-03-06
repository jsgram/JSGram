import { Router } from 'express';
import { getProfile } from '../../controllers/profile.controllers/getProfile';
import { getProfilePosts } from '../../controllers/profile.controllers/getProfilePosts';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { photoRouter } from './photo.routes/photo.routes';
import { editRouter } from './edit.routes/edit.routes';

export const profileRouter = Router();

profileRouter.get('/:userName', isAuthorized, getProfile);
profileRouter.get('/:userName/posts/:page', isAuthorized, getProfilePosts);

profileRouter.use('/', editRouter);
profileRouter.use('/photo', photoRouter);
