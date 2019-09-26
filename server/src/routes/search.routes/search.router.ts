import { Router } from 'express';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';
import { getUsers } from '../../controllers/search.controllers/get.users';

export const searchRouter = Router();

searchRouter.get('/:query/:page', isAuthorized, getUsers);
