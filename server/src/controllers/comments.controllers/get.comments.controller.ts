import { Request, Response, NextFunction } from 'express';
import { getCommentsWithPagination } from '../../db.requests/get.comments.with.pagination';

interface IParams {
    params: {
        postId: string;
        page: number;
    };
}

export const COMMENTS_PER_PAGE = 10;

export const getPostComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {postId, page}}: IParams = req;

        const skip = (page - 1) * COMMENTS_PER_PAGE;
        const commentsAll = await getCommentsWithPagination(postId, skip, next);

        res.json({commentsAll});
    } catch (e) {
        next(e);
    }
};
