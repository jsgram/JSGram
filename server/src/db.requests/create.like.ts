import { NextFunction } from 'express';
import { ILikeModel, Like } from '../models/like.model';

export const createLike = async (postId: string, userId: string, next: NextFunction):
    Promise<ILikeModel | null | void> => {
    try {
        const createdLike = await Like.create({postId, userId});
        if (!createdLike) {
            throw new Error('Can not create like');
        }

        return createdLike;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
