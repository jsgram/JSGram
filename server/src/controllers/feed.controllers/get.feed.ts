import { Request, Response, NextFunction } from 'express';
import { getPostsForFeed } from '../../db.requests/getFeed.requests';
import { postsPerPage } from '../../common.constants/getPosts.constants';

interface IParams {
    params: {
        page: number;
    };
}

export const getFeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user: { following } } }: Response = res;
        const { params: { page } }: IParams = req;
        const skip = (page - 1) * postsPerPage;

        const feed = await getPostsForFeed(following, skip, postsPerPage);

        res.json({ feed });
    } catch (e) {
        return next(e);
    }
};
