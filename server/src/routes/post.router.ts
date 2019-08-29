import { Router } from 'express';
import { findAll } from '../controllers/post.controllers/find.all.posts';
import { findById } from '../controllers/post.controllers/find.post.by.id';
import { create } from '../controllers/post.controllers/create.post';
import { update } from '../controllers/post.controllers/update.post.by.id';
import { remove } from '../controllers/post.controllers/remove.post.by.id';
import { isAuthorized } from '../controllers/auth.controllers/auth.isAuthorized';

export const postRouter = Router();

postRouter.post('/', isAuthorized, create);
postRouter.patch('/:id', isAuthorized, update);
postRouter.delete('/:id', isAuthorized, remove);

postRouter.get('/', findAll);
postRouter.get('/:id', findById);
