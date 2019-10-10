import { Like } from '../models/like.model';
import { IUserModel } from '../models/user.model';

export const getLikedPosts = async (user: IUserModel, skip: number, POSTS_PER_PAGE: number): Promise<object[]> => {
    return Like
        .find({ userId: user._id })
        .populate({
            path: 'postId',
            populate: {
                path: 'author',
                select: '_id photoPath username',
            },
        })
        .sort('-createdAt')
        .limit(POSTS_PER_PAGE)
        .skip(skip);
};
