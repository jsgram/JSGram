import { Post } from '../models/post.model';
import { TWO_DAYS } from '../common.constants/getPosts.constants';

export const getPostsForFeed = async (following: string[], skip: number, POSTS_PER_PAGE: number): Promise<object[]> => {

    const feed = await Post
        .find({
            author: { $in: following },
            createdAt: { $gt: new Date(Date.now() - TWO_DAYS)},
            })
        .populate('author', 'username photoPath')
        .sort('-createdAt')
        .limit(POSTS_PER_PAGE)
        .skip(skip);

    return feed;
};
