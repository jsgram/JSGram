import { NextFunction } from 'express';
import { ILikeModel, Like } from '../models/like.model';
import { IPostModel, Post } from '../models/post.model';

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

export const removeUserIdFromPost = async (postId: string, userId: string, next: NextFunction):
    Promise<IPostModel | null | void> => {
    try {
        const postWithRemovedUserId = await Post.findOneAndUpdate({_id: postId},
            {$pull: {authorsOfLike: userId}}, {new: true});
        if (!postWithRemovedUserId) {
            throw new Error('Can not remove like from post');
        }

        return postWithRemovedUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
