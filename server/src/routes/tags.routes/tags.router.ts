import { Router } from 'express';
import { findByTagName } from '../../controllers/post.controllers/find.post.by.tag';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const tagsRouter = Router();

tagsRouter.get('/:tagName/:page', isAuthorized, findByTagName);
