import { Request, Response, NextFunction } from 'express';
import { getCommentsWithPagination } from '../../db.requests/get.comments.with.pagination';
import { COMMENTS_PER_PAGE } from '../../common.constants/getComments.constants';

interface IParams {
    postId: string;
    page: number;
}

export const getPostComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {postId, page}: IParams = req.params;

        const skip = (page - 1) * COMMENTS_PER_PAGE;
        const commentsAll = await getCommentsWithPagination(postId, skip, next);

        res.json({commentsAll});
    } catch (e) {
        next(e);
    }
};
