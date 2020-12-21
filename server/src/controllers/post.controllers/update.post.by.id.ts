import { Request, Response, NextFunction } from 'express';
import { updatePost } from '../../db.requests/updatePost.request';
import { getTags } from '../../helpers/getTags.post';

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {id: postId}, body: {description}}:
            { params: { id: string }, body: { description: string } } = req;
        const {locals: {user: {id: userId, isAdmin}}}: { locals: { user: { id: string, isAdmin: boolean } } } = res;

        const tags = getTags(description);
        const updPost = await updatePost(postId, description, tags, userId, isAdmin, next);

        res.json({message: 'Post was successfully updated', updPost});
    } catch (e) {
        next({message: 'Can not update post', status: 500});
    }
};
