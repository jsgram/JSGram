import { Router } from 'express';
import { handlePhoto, upload } from '../controllers/profile.controllers/handlePhoto';

export const profileRouter = Router();

profileRouter.post('/photo', upload.single('userPhoto'), handlePhoto);
profileRouter.put('/photo', upload.single('userPhoto'), handlePhoto);
profileRouter.delete('/photo', handlePhoto);
