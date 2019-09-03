import { Request, Response, NextFunction } from 'express';
import { ILikeModel } from '../../models/like.model';
import { deleteLike, removeLikeIdFromPost } from '../../db.requests/remove.like.requsets';

export const removeLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {postId}: ILikeModel = req.params;
        const {userId}: ILikeModel = req.body;

        const removedLike = await deleteLike(postId, userId, next);
        if (!removedLike) {
            throw new Error('Like does not exist');
        }

        const postWithRemovedUserId = await removeLikeIdFromPost(postId, userId, next);
        if (!postWithRemovedUserId) {
            throw new Error('Can not remove like from post');
        }

        res.json({message: 'Like removed successfully', updatedPost: postWithRemovedUserId});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
