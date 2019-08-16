import { Router } from 'express';
import { getProfile } from '../controllers/profile.controllers/getProfile';

export const profileRouter = Router();

profileRouter.get('/:id', getProfile);
