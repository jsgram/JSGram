import { Router } from 'express';
import { isAuthorized } from '../../../controllers/auth.controllers/auth.isAuthorized';
import { handlePhoto } from '../../../controllers/profile.controllers/photo.controllers/handlePhoto';

export const photoRouter = Router();

photoRouter.post('/', isAuthorized, handlePhoto);
photoRouter.put('/', isAuthorized, handlePhoto);
photoRouter.delete('/', isAuthorized, handlePhoto);
