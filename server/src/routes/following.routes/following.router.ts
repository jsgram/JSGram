import { Router } from 'express';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { follow } from '../../controllers/following.controllers/follow';
import { unfollow } from '../../controllers/following.controllers/unfollow';

export const followingRouter = Router();

followingRouter.post('/follow', isAuthorized, follow);
followingRouter.put('/unfollow/:id', isAuthorized, unfollow);
