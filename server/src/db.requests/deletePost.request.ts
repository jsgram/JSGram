import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { deleteTags } from '../db.requests/tag.requests';
import { NextFunction } from 'express';

export const deletePost = async (
    postId: string,
    userId: string,
    isAdmin: boolean,
    next: NextFunction,
): Promise<any> => {
    try {
        const delPost = await Post.findById(postId);
        if (!delPost) {
            throw new Error('Post doesn\'t exist');
        }

        if (!isAdmin && delPost.author.toString() !== userId.toString()) {
            throw new Error('You do not have permission to delete post');
        }
        delPost.remove();

        await deleteTags(postId, next);

        await User.findByIdAndUpdate(userId, { $pull: {posts: postId} });

        return delPost;
    } catch (e) {
        next({status: 500, message: 'Post doesn\'t exist'});
    }
};
