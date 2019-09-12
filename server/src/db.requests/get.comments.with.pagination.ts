import { NextFunction } from 'express';
import { Comment, ICommentModel } from '../models/comment.model';
import { COMMENTS_PER_PAGE } from '../controllers/comments.controllers/get.comments.controller';

export const getCommentsWithPagination = async (postId: string, skip: number, next: NextFunction):
    Promise<ICommentModel[] | void | null> => {
    try {
        return await Comment.find({postId}).limit(COMMENTS_PER_PAGE).skip(skip);
    } catch (e) {
        next({status: 409, message: 'Error with fetching comments'});
    }
};
