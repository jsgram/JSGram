import {Router} from 'express';
import { getFollowers } from '../../controllers/subscribers.controllers/followers';
import { getFollowing } from '../../controllers/subscribers.controllers/following';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const subscribersRouter = Router();

subscribersRouter.get('/followers/:username/:page', isAuthorized, getFollowers);
subscribersRouter.get('/following/:username/:page', isAuthorized, getFollowing);
