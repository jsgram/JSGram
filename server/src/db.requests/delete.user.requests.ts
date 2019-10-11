import { NextFunction } from 'express';
import { User, IUserModel } from '../models/user.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Like } from '../models/like.model';

export const deleteUser = async (userId: string, next: NextFunction):
    Promise<IUserModel | void> => {
    try {
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            throw new Error(`Database error while deleting user ${userId}.`);
        }

        await Post.deleteMany({author: userId});
        await Comment.deleteMany({authorId: userId});
        await Like.deleteMany({userId});

        return deletedUser;
    } catch (e) {
        next({ status: 409, message: e.message });
    }
};
