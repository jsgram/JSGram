import { Post, IPostModel } from '../models/post.model';
import { NextFunction } from 'express';

export const updatePost = async (id: string, description: string, tags: string[], userId: string,
                                 next: NextFunction): Promise<IPostModel | void> => {
    try {
        const updPost = await Post.findById(id);
        if (!updPost || updPost.author.toString() !== userId.toString()) {
            throw new Error('Post doesn\'t exist');
        }

        await updPost.updateOne({description, tags}, {new: true});
        return updPost;
    } catch (e) {
        next({message: 'Post doesn\'t exist', status: 409});
    }
};
