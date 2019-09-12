import { Router } from 'express';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { addComments } from '../../controllers/comments.controllers/add.comments.controller';

export const commentsRouter = Router();

commentsRouter.post('/', isAuthorized, addComments);
