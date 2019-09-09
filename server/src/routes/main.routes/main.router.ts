import { Router } from 'express';
import { getUser } from '../../controllers/main.controllers/get.user';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const mainRouter = Router();

mainRouter.get('/', isAuthorized, getUser);
