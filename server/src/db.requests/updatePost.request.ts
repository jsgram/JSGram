import { Post, IPostModel } from '../models/post.model';
import { NextFunction } from 'express';

export const updatePost = async (id: string, description: string, tags: string[],
                                 next: NextFunction): Promise<IPostModel | void> => {
    try {
        const updPost = await Post.findByIdAndUpdate(id, {description, tags}, {new: true});
        if (!updPost) {
            throw new Error('Post doesn\'t exist');
        }

        return updPost;
    } catch (e) {
        next({message: 'Post doesn\'t exist', status: 409});
    }
};
