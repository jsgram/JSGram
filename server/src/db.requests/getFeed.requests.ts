import { Post } from '../models/post.model';

export const getPostsForFeed = async (users: string[], skip: number, POSTS_PER_PAGE: number): Promise<object[]> => {

    const feed = await Post
        .find({
            author: { $in: users },
            })
        .populate('author', 'username photoPath')
        .sort('-createdAt')
        .limit(POSTS_PER_PAGE)
        .skip(skip);

    return feed;
};
