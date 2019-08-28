import { Post, IPostModel } from '../models/post.model';
import { User } from '../models/user.model';
import { NextFunction } from 'express';

export const deletePost = async (postId: string, userId: string, next: NextFunction): Promise<any> => {
    try {
        const delPost = await Post.findByIdAndDelete(postId);
        if (!delPost) {
            throw new Error('Post doesn\'t exist');
        }

        await User.findByIdAndUpdate(userId, { $pull: {posts: postId} });

        return delPost;
    } catch (e) {
        next({message: 'Post doesn\'t exist', status: 409});
    }
};
