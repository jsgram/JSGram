import { NextFunction } from 'express';
import { ILikeModel, Like } from '../models/like.model';

export const deleteLike = async (postId: string, userId: string, next: NextFunction):
    Promise<ILikeModel | null | void> => {
    try {
        const removedLike = await Like.findOneAndDelete({$and: [{postId}, {userId}]});
        if (!removedLike) {
            throw new Error('Like does not exist');
        }

        return removedLike;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
