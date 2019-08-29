import { Request, Response, NextFunction } from 'express';
import { getPostsWithPagination } from '../../db.requests/get.posts.with.pagination';
import { getUserByUsername } from '../../db.requests/user.requests';

interface IParams {
    page: number;
    URLUserName: string;
}

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { URLUserName, page }: IParams = req.params;
        const user = await getUserByUsername(URLUserName, next);

        const {
            posts,
            followers,
            following,
            bio,
            fullName,
            username,
            photoPath,
            email,
        }: any = user;

        const skip = (page - 1) * 9;
        const postsAll = await getPostsWithPagination(posts, skip, next);

        const userProfile = {
            posts: posts.length,
            followers: followers.length,
            following: following.length,
            description: bio,
            fullName,
            username,
            photo: photoPath,
            notifications: user.notifications,
            privacy: user.privacy,
            email,
            postsAll,
        };

        res.json({userProfile});
    } catch (e) {
        next(e);
    }
};
