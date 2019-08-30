import { NextFunction } from 'express';
import { Like } from '../models/like.model';

export const countLike = async (postId: string, userId: string, next: NextFunction): Promise<number | undefined> => {
    try {
        return await Like.countDocuments({$or: [{postId}, {userId}]});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
