import { Request, Response, NextFunction } from 'express';
import { ILikeModel } from '../../models/like.model';
import { countLike, createLike, addUserIdToPost } from '../../db.requests/add.like.requests';
import { serverError } from '../../common.constants/errors.constants';

export const addLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {postId, userId}: ILikeModel = req.body;

        if (!postId || !userId) {
            const message = 'No postId or username';

            console.warn(new Error(message));
            next({ message, status: 422 });
        }

        const likeExist = await countLike(postId, userId, next);
        if (likeExist) {
            const message = 'Like already exist';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const createdLike = await createLike(postId, userId, next);
        if (!createdLike) {
            const message = 'Can not create like';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const postWithNewLike = await addUserIdToPost(postId, userId, next);
        if (!postWithNewLike) {
            const message = 'Can not add like to post';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({message: 'Like added successfully', updatedPost: postWithNewLike});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
