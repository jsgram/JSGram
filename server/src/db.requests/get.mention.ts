import { NextFunction } from 'express';
import { Post } from '../models/post.model';
import { POSTS_PER_PAGE } from '../common.constants/getPosts.constants';

export const findMention = async (username: string, skip: number, next: NextFunction):
    Promise<any> => {
    try {
        const posts = await Post.find({description: {$regex: `@${username}`}})
            .sort('-createdAt')
            .populate({
                path: 'author',
                select: '_id username photoPath',
            })
            .limit(POSTS_PER_PAGE)
            .skip(skip);

        if (!posts) {
            throw new Error('Can not find posts');
        }

        return posts;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};
