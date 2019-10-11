import { Request, Response, NextFunction } from 'express';
import { getLikedPosts } from '../../db.requests/get.likes';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';
import { ILikeModel } from '../../models/like.model';
import { IPostModel } from '../../models/post.model';

interface IParams {
    params: {
        page: number;
    };
}

export const getLikes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user } }: Response = res;
        const { params: { page } }: IParams = req;
        const skip = (page - 1) * POSTS_PER_PAGE;

        const likes = await getLikedPosts(user, skip, POSTS_PER_PAGE) as ILikeModel[];
        const feed = likes.map((like: ILikeModel): IPostModel => like.postId);

        res.json({ feed });
    } catch (e) {
        return next(e);
    }
};
