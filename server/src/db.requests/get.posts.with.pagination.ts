import { NextFunction } from 'express';
import { IPostModel, Post } from '../models/post.model';

export const getPostsWithPagination = async (posts: [], skip: number, next: NextFunction):
    Promise<IPostModel[] | void | null> => {
    try {
        const allPosts = await Post
            .find({_id: {$in: posts}})
            .populate({
                path: 'comments',
                options: {
                    limit: 10,
                },
                populate: ({
                    path: 'authorId',
                    options: {
                        select: '_id username photoPath',
    },
                }),
            })
            .sort({createdAt: -1})
            .limit(9)
            .skip(skip);
        if (!allPosts) {
            throw new Error('No posts');
        }
        return allPosts;
    } catch (e) {
        next({status: 409, message: 'No posts'});
    }
};
