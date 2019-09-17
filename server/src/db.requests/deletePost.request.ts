import { Post, IPostModel } from '../models/post.model';
import { User } from '../models/user.model';
import { NextFunction } from 'express';

export const deletePost = async (postId: string, userId: string, next: NextFunction): Promise<any> => {
    try {
        const delPost = await Post.findById(postId);
        if (!delPost || delPost.author.toString() !== userId.toString()) {
            throw new Error('Post doesn\'t exist');
        }
        delPost.remove();

        await User.findByIdAndUpdate(userId, { $pull: {posts: postId} });

        return delPost;
    } catch (e) {
        next({message: 'Post doesn\'t exist', status: 409});
    }
};
