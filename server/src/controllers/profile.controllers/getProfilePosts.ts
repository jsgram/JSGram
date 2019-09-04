import { NextFunction, Request, Response } from 'express';
import { getUserByUsername } from '../../db.requests/user.requests';
import { getPostsWithPagination } from '../../db.requests/get.posts.with.pagination';

interface IParams {
    page: number;
    userName: string;
}

export const getProfilePosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName, page }: IParams = req.params;
        const user = await getUserByUsername(userName, next);

        const {posts}: any = user;
        const POSTS_ON_PAGE = 9;

        const skip = (page - 1) * POSTS_ON_PAGE;
        const postsAll = await getPostsWithPagination(posts, skip, next);

        res.json({postsAll});
    } catch (e) {
        next(e);
    }
};
