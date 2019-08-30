import { NextFunction } from 'express';
import { IPostModel, Post } from '../models/post.model';

export const removeLikeIdFromPost = async (postId: string, next: NextFunction):
    Promise<IPostModel | null | void> => {
    try {
        const postWithRemovedLikeId = await Post.findOneAndUpdate({}, {$pull: {likes: postId}}, {new: true});
        if (!postWithRemovedLikeId) {
            throw new Error('Can not remove like from post');
        }

        return postWithRemovedLikeId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
