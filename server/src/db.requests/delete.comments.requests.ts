import { NextFunction } from 'express';
import { Comment, ICommentModel } from '../models/comment.model';
import { Post, IPostModel } from '../models/post.model';

export const deleteComment = async (commentId: string, next: NextFunction):
    Promise<ICommentModel | void> => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            throw new Error(`Database error while deleting comment ${commentId}.`);
        }

        return deletedComment;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};

export const deleteCommentFromPost = async (postId: string, commentId: string, next: NextFunction):
    Promise<IPostModel | ICommentModel | void | null > => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: commentId } },
            { new: true },
        );

        if (!updatedPost) {
            throw new Error(`Database error while deleting comment ${commentId} from post ${postId}.`);
        }

        return updatedPost;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};
