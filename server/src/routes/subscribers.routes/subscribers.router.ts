import {Router} from 'express';
import { getFollowers } from '../../controllers/subscribers.controllers/followers';
import { getFollowing } from '../../controllers/subscribers.controllers/following';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const subscribersRouter = Router();

subscribersRouter.get('/followers', isAuthorized, getFollowers);
subscribersRouter.get('/following', isAuthorized, getFollowing);
