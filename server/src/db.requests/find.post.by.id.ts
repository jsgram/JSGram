import { NextFunction } from 'express';
import { IPostModel, Post } from '../models/post.model';

export const findPostById = async (postId: string, next: NextFunction): Promise<IPostModel | void | null> => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post does not exist');
        }

        return post;
    } catch (e) {
        next({status: 409, message: 'Post does not exist'});
    }
};
