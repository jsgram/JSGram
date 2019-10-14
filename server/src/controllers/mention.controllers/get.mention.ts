import { Request, Response, NextFunction } from 'express';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';
import { findMention } from '../../db.requests/get.mention';

interface IParams {
    params: {
        page: number;
    };
}

export const getMention = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user: {username} } }: Response = res;
        const { params: { page } }: IParams = req;
        const skip = (page - 1) * POSTS_PER_PAGE;

        const posts = await findMention(username, skip, next);

        res.json({ posts });
    } catch (e) {
        return next(e);
    }
};
