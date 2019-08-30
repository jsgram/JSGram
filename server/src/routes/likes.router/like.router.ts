import { Router } from 'express';
import { addLike } from '../../controllers/like.controllers/add.like';
import { removeLike } from '../../controllers/like.controllers/remove.like';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const likesRouter = Router();

likesRouter.post('/like', isAuthorized, addLike);
likesRouter.delete('/unlike/:postId', isAuthorized, removeLike);
