import { NextFunction } from 'express';
import { IPostModel, Post } from '../models/post.model';

export const addLikeIdToPost = async (postId: string, createdLikeId: string, next: NextFunction):
    Promise<IPostModel | null | void> => {
    try {
        const updatedPostLikes = await Post.findOneAndUpdate({_id: postId}, {likes: createdLikeId}, {new: true});
        if (!updatedPostLikes) {
            throw new Error('Can not add like to post');
        }

        return updatedPostLikes;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
