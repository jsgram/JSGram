import { Router } from 'express';
import { getProfile } from '../controllers/profile.controllers/getProfile';
import { handlePhoto } from '../controllers/profile.controllers/handlePhoto';

export const profileRouter = Router();

profileRouter.get('/:id', getProfile);

profileRouter.post('/photo', handlePhoto);
profileRouter.put('/photo', handlePhoto);
profileRouter.delete('/photo', handlePhoto);
