import { NextFunction } from 'express';
import { Comment, ICommentModel } from '../models/comment.model';
import { COMMENTS_PER_PAGE } from '../common.constants/getPosts.constants';

export const getCommentsWithPagination = async (postId: string, skip: number, next: NextFunction):
    Promise<ICommentModel[] | void | null> => {
    try {
        return await Comment
            .find({postId})
            .populate('authorId', ['username', '_id', 'photoPath', 'email'])
            .sort({createdAt: -1})
            .limit(COMMENTS_PER_PAGE)
            .skip(skip);
    } catch (e) {
        next({ status: 500, message: 'Error with fetching comments' });
    }
};
