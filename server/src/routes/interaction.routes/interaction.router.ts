import { Router } from 'express';

import { createInteraction } from '../../controllers/interaction.controllers/create.interaction';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const interactionRouter = Router();

interactionRouter.post('/', isAuthorized, createInteraction);
