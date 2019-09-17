import { Request, Response, NextFunction } from 'express';
import { updatePost } from '../../db.requests/updatePost.request';
import { getTags } from '../../helpers/getTags.post';

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const description = req.body.description;
        const tags = getTags(description);
        const userId = res.locals.user._id;
        const updPost = await updatePost(id, description, tags, userId, next);

        res.json({message: 'Post was successfully updated', updPost});
    } catch (e) {
        next({message: 'Can not update post', status: 500});
    }
};
