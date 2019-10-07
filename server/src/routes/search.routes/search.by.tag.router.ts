import { Router } from 'express';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { getTags } from '../../controllers/search.controllers/get.tags';

export const searchByTagRouter = Router();

searchByTagRouter.get('/:query/:page', isAuthorized, getTags);
