import { Router } from 'express';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { addComments } from '../../controllers/comments.controllers/add.comments.controller';
import { getPostComments } from '../../controllers/comments.controllers/get.comments.controller';

export const commentsRouter = Router();

commentsRouter.get('/:postId/:page', isAuthorized, getPostComments);
commentsRouter.post('/', isAuthorized, addComments);
