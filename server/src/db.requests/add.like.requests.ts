import { NextFunction } from 'express';
import { ILikeModel, Like } from '../models/like.model';
import { IPostModel, Post } from '../models/post.model';

export const countLike = async (postId: string, userId: string, next: NextFunction):
    Promise<ILikeModel | number | undefined> => {
    try {
        return await Like.countDocuments({postId, userId});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};

export const createLike = async (postId: string, userId: string, next: NextFunction):
    Promise<ILikeModel | null | void> => {
    try {
        const createdLike = await Like.create({postId, userId});
        if (!createdLike) {
            throw new Error('Can not create like');
        }

        return createdLike;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};

export const addUserIdToPost = async (postId: string, userId: string, next: NextFunction):
    Promise<IPostModel | null | void> => {
    try {
        const updatedPostUsersLiked = await Post.findOneAndUpdate({_id: postId},
            {$push: {authorsOfLike: userId}}, {new: true});
        if (!updatedPostUsersLiked) {
            throw new Error('Can not add like to post');
        }

        return updatedPostUsersLiked;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
