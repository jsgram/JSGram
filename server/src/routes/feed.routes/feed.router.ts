import { Router } from 'express';
import { getFeed } from '../../controllers/feed.controllers/get.feed';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { getFriendsRecommendations } from '../../controllers/feed.controllers/getFriendsRecommendations';

export const feedRouter = Router();

feedRouter.get('/:page', isAuthorized, getFeed);
feedRouter.get('/', isAuthorized, getFriendsRecommendations);
