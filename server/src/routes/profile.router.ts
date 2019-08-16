import { Router } from 'express';
import { handlePhoto } from '../controllers/profile.controllers/handlePhoto';

export const profileRouter = Router();

profileRouter.post('/photo', handlePhoto);
profileRouter.put('/photo', handlePhoto);
profileRouter.delete('/photo', handlePhoto);
