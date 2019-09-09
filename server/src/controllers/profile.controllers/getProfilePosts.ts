import { NextFunction, Request, Response } from 'express';
import { getUserByUsername } from '../../db.requests/user.requests';
import { getPostsWithPagination } from '../../db.requests/get.posts.with.pagination';
import { postsPerPage } from '../../common.constants/getPosts.constants';

interface IParams {
    page: number;
    userName: string;
}

export const getProfilePosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {userName, page}: IParams = req.params;
        const user = await getUserByUsername(userName, next);
        if (!user) {
            throw new Error('No user');
        }

        const {posts}: any = user;

        const skip = (page - 1) * postsPerPage;
        const postsAll = await getPostsWithPagination(posts, skip, next);
        if (!postsAll) {
            throw new Error('No posts');
        }
        res.json({postsAll});
    } catch (e) {
        next(e);
    }
};
