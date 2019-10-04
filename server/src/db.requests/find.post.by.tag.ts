import { NextFunction } from 'express';
import { IPostModel, Post } from '../models/post.model';

export const findPostByTag = async (
    tagName: string,
    skip: number,
    POSTS_PER_PAGE: number,
    next: NextFunction,
): Promise<IPostModel[] | void | null> => {
    try {
        return await Post
            .find({tags: {$in: [tagName]}})
            .populate('author', 'username photoPath')
            .sort('-createdAt')
            .limit(POSTS_PER_PAGE)
            .skip(skip);
    } catch (e) {
        next({status: 409, message: 'Posts do not exist'});
    }
};
