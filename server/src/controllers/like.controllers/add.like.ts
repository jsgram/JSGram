import { Request, Response, NextFunction } from 'express';
import { ILikeModel } from '../../models/like.model';
import { countLike, createLike, addUserIdToPost } from '../../db.requests/add.like.requests';

export const addLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {postId, userId}: ILikeModel = req.body;

        if (!postId || !userId) {
            throw new Error('No postId or username');
        }

        const likeExist = await countLike(postId, userId, next);
        if (likeExist) {
            throw new Error('Like already exist');
        }

        const createdLike = await createLike(postId, userId, next);
        if (!createdLike) {
            throw new Error('Can not create like');
        }

        const postWithNewLike = await addUserIdToPost(postId, userId, next);
        if (!postWithNewLike) {
            throw new Error('Can not add like to post');
        }

        res.json({message: 'Like added successfully', updatedPost: postWithNewLike});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
