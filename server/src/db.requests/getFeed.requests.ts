import { Post } from '../models/post.model';

export const getPostsForFeed = async (following: string[], skip: number, postPerPage: number): Promise<object[]> => {
    const twoDays = 48 * 60 * 60 * 1000;

    const feed = await Post
        .find({
            author: { $in: following },
            createdAt: { $gt: new Date(Date.now() - twoDays)},
            })
        .populate('author', 'username photoPath')
        .sort('-createdAt')
        .limit(postPerPage)
        .skip(skip);

    return feed;
};
