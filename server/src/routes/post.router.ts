import {Router} from 'express';
import {findAll} from '../controllers/post.controllers/find.all.posts';
import {findById} from '../controllers/post.controllers/find.post.by.id';
import {create} from '../controllers/post.controllers/create.post';
import {update} from '../controllers/post.controllers/update.post.by.id';
import {remove} from '../controllers/post.controllers/remove.post.by.id';

const postRouter = Router();

postRouter.get('/', findAll);
postRouter.get('/:id', findById);
postRouter.post('/', create);
postRouter.put('/:id', update);
postRouter.delete('/:id', remove);

export {postRouter};
