import { Router } from 'express';
import { getFeed } from '../../controllers/feed.controllers/get.feed';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const feedRouter = Router();

feedRouter.get('/:page', isAuthorized, getFeed);
