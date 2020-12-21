import { Router } from 'express';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { addComments } from '../../controllers/comments.controllers/add.comments.controller';
import { getPostComments } from '../../controllers/comments.controllers/get.comments.controller';
import { update } from '../../controllers/comments.controllers/update.comments.controller';
import { deleteComments } from '../../controllers/comments.controllers/delete.comments.controller';

export const commentsRouter = Router();

commentsRouter.get('/:postId/:page', isAuthorized, getPostComments);
commentsRouter.post('/', isAuthorized, addComments);
commentsRouter.patch('/:id', isAuthorized, update);
commentsRouter.delete('/:id', isAuthorized, deleteComments);
