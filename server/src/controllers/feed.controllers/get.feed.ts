import { Request, Response, NextFunction } from 'express';
import { getPostsForFeed } from '../../db.requests/getFeed.requests';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';
import { serverError } from '../../common.constants/errors.constants';

interface IParams {
    params: {
        page: number;
    };
}

export const getFeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user: { following, _id } } }: Response = res;
        const { params: { page } }: IParams = req;
        const skip = (page - 1) * POSTS_PER_PAGE;
        const users = [...following, _id];

        const feed = await getPostsForFeed(users, skip, POSTS_PER_PAGE);

        res.json({ feed });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
