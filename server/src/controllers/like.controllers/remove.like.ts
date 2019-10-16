import { Request, Response, NextFunction } from 'express';

import { ILikeModel } from '../../models/like.model';
import { deleteLike, removeUserIdFromPost } from '../../db.requests/remove.like.requsets';
import { serverError } from '../../common.constants/errors.constants';

export const removeLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {postId}: ILikeModel = req.params;
        const {userId}: ILikeModel = req.body;

        const removedLike = await deleteLike(postId, userId, next);
        if (!removedLike) {
            const message = 'Like does not exist';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const postWithRemovedUserId = await removeUserIdFromPost(postId, userId, next);
        if (!postWithRemovedUserId) {
            const message = 'Can not remove like from post';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({message: 'Like removed successfully', updatedPost: postWithRemovedUserId});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
