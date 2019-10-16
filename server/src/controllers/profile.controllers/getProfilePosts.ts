import { NextFunction, Request, Response } from 'express';
import { getUserByUsername } from '../../db.requests/user.requests';
import { getPostsWithPagination } from '../../db.requests/get.posts.with.pagination';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';
import { serverError } from '../../common.constants/errors.constants';

interface IParams {
    page: number;
    userName: string;
}

export const getProfilePosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {userName, page}: IParams = req.params;
        const user = await getUserByUsername(userName, next);
        if (!user) {
            const message = 'No user';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const {posts}: any = user;

        const skip = (page - 1) * POSTS_PER_PAGE;
        const postsAll = await getPostsWithPagination(posts, skip, next);
        if (!postsAll) {
            const message = 'No posts';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }
        res.json({postsAll});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
