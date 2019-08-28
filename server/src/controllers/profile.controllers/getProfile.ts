import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import { Post } from '../../models/post.model';

interface IParams {
    page: number;
}

export const getProfile = async (req: Request, res: Response, next: NextFunction):
    Promise<void> => {
    try {
        const {
            posts,
            followers,
            following,
            bio,
            fullName,
            username,
            photoPath,
            email,
        }: IUserModel = res.locals.user;

        const {page}: IParams = req.params;
        const skip = (page - 1) * 9;
        const postsAll = await Post.find({_id: {$in: posts}}).sort({createdAt: -1}).limit(2).skip(skip);

        const userProfile = {
            posts: posts.length,
            followers: followers.length,
            following: following.length,
            description: bio,
            fullName,
            username,
            photo: photoPath,
            email,
            postsAll,
        };

        res.json({userProfile});
    } catch (e) {
        next(e);
    }
};
