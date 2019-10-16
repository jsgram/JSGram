import { Router } from 'express';

import { createInteraction } from '../../controllers/interaction.controllers/create.interaction';

export const interactionRouter = Router();

interactionRouter.post('/', createInteraction);
