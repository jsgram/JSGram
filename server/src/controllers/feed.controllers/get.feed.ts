import { Request, Response, NextFunction } from 'express';
import { IUserModel} from '../../models/user.model';
import { getPostsForFeed } from '../../db.requests/getFeed.requests';

interface IParams {
    page: number;
}

export const getFeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { following }: IUserModel = res.locals.user;
        const { page }: IParams = req.params;
        const postsPerPage = 8;
        const skip = (page - 1) * postsPerPage;

        const feed = await getPostsForFeed(following, skip, postsPerPage);

        res.json({ feed });
    } catch (e) {
        return next(e);
    }
};
