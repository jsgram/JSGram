import { Request, Response, NextFunction } from 'express';
import { updateComment } from '../../db.requests/update.comment.request';

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const comment = req.body.comment;

        const updatedComment = await updateComment(id, comment, next);

        if (!updatedComment) {
            throw new Error('Comment doesn\'t exist');
        }

        res.json({message: 'Comment was successfully updated', updatedComment});
    } catch (e) {
        next({message: 'Can not update comment', status: 500});
    }
};
