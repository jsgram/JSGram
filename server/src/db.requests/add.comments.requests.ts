import { NextFunction } from 'express';
import { Comment, ICommentModel } from '../models/comment.model';
import { Post, IPostModel } from '../models/post.model';

export const createComment = async (postId: string, authorId: string, comment: string, next: NextFunction):
    Promise<ICommentModel | null | void> => {
    try {
        const createdComment = await Comment.create({postId, authorId, comment});
        if (!createdComment) {
            throw new Error('Can not create comment');
        }

        const createdCommentWithAuthor = await createdComment.populate({
            path: 'authorId',
            select: '_id username photoPath',
        })
            .execPopulate();

        return createdCommentWithAuthor;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};

export const addCommentIdToPost = async (postId: string, commentId: string, next: NextFunction):
    Promise<IPostModel | null | void> => {
    try {
        const updatedPost =
            await Post.findOneAndUpdate({_id: postId}, {$push: {comments: commentId}}, {new: true});
        if (!updatedPost) {
            throw new Error('Can not create comment');
        }

        return updatedPost;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};
