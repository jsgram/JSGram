import {Router} from 'express';
import {findAll} from '../controllers/user.controllers/find.all.users';
import {findById} from '../controllers/user.controllers/find.user.by.id';
import {create} from '../controllers/user.controllers/create.user';
import {update} from '../controllers/user.controllers/update.user.by.id';
import {remove} from '../controllers/user.controllers/remove.user.by.id';

export const userRouter = Router();

userRouter.get('/', findAll);
userRouter.get('/:id', findById);
userRouter.post('/', create);
userRouter.put('/:id', update);
userRouter.delete('/:id', remove);
