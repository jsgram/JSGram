import { ITagModel, Tag } from '../models/tag.model';

export const findPostByTag = async (
    tagName: string,
    skip: number,
    POSTS_PER_PAGE: number,
): Promise<ITagModel | {posts: []}> => {
    const tagPosts = await Tag
        .findOne({tagName})
        .populate({
            path: 'posts',
            options: {
                sort: {created_at: -1},
                limit: POSTS_PER_PAGE,
                skip,
            },
            populate: {
                path: 'author',
                select: '_id username photoPath',
            },
        });

    return tagPosts || {posts: []};
};
