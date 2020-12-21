import { Router } from 'express';

import { sendNewsEmail } from '../../controllers/event.controllers/send.news.email';
import { sendProductEmail } from '../../controllers/event.controllers/send.product.email';

export const eventRouter = Router();

eventRouter.post('/news', sendNewsEmail);
eventRouter.post('/product', sendProductEmail);
