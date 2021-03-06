import {Router} from 'express';
import {findAll} from '../../controllers/user.controllers/find.all.users';
import {findById} from '../../controllers/user.controllers/find.user.by.id';
import {create} from '../../controllers/user.controllers/create.user';
import {remove} from '../../controllers/user.controllers/remove.user.by.id';
import { isAuthorized } from '../../controllers/auth.controllers/auth.isAuthorized';

export const userRouter = Router();

userRouter.get('/', findAll);
userRouter.get('/:id', findById);
userRouter.post('/', create);
userRouter.delete('/:id', isAuthorized, remove);
