import { Request, Response, NextFunction } from 'express';
import { getPostsWithPagination } from '../../db.requests/get.posts.with.pagination';
import { getUserByUsername } from '../../db.requests/user.requests';

interface IParams {
    page: number;
    userName: string;
}

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName }: IParams = req.params;
        const user = await getUserByUsername(userName, next);

        const {
            posts,
            followers,
            following,
            bio,
            fullName,
            username,
            photoPath,
            subscriptions,
            privacy,
            email,
        }: any = user;

        const _id = res.locals.user._id;

        const userProfile = {
            _id,
            posts: posts.length,
            followers: followers.length,
            following: following.length,
            description: bio,
            fullName,
            username,
            photo: photoPath,
            subscriptions,
            privacy,
            email,
        };

        res.json({userProfile});
    } catch (e) {
        next(e);
    }
};

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
