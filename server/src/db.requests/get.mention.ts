import { NextFunction } from 'express';
import { Post } from '../models/post.model';

export const findMention = async (username: string, skip: number, next: NextFunction):
    Promise<any> => {
    try {
        const posts = await Post.find({description: {$regex: `@${username}`}})
            .sort('-createdAt')
            .skip(skip);

        if (!posts) {
            throw new Error('Can not find posts');
        }

        return posts;
    } catch (e) {
        next({status: 400, message: e.message});
    }
};
