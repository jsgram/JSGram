import { Router } from 'express';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { getMention } from '../../controllers/mention.controllers/get.mention';

export const mentionRouter = Router();

mentionRouter.get('/:page', isAuthorized, getMention);
