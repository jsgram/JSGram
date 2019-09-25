import { Post, IPostModel } from '../models/post.model';
import { NextFunction } from 'express';

export const updatePost = async (
    id: string,
    description: string,
    tags: string[],
    userId: string,
    isAdmin: boolean,
    next: NextFunction,
): Promise<IPostModel | void> => {
    try {
        const updPost = await Post.findById(id);
        if (!updPost) {
            throw new Error('Post doesn\'t exist');
        }
        if (!isAdmin && updPost.author.toString() !== userId.toString()) {
            throw new Error('You do not have permission to edit post');
        }
        await updPost.updateOne({description, tags}, {new: true});
        return updPost;
    } catch (e) {
        next({message: 'Post doesn\'t exist', status: 409});
    }
};
