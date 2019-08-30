import { NextFunction } from 'express';
import { ILikeModel, Like } from '../models/like.model';
import { IPostModel, Post } from '../models/post.model';

export const countLike = async (postId: string, userId: string, next: NextFunction): Promise<number | undefined> => {
    try {
        return await Like.countDocuments({$or: [{postId}, {userId}]});
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

export const addLikeIdToPost = async (postId: string, createdLikeId: string, next: NextFunction):
    Promise<IPostModel | null | void> => {
    try {
        const updatedPostLikes = await Post.findOneAndUpdate({_id: postId}, {likes: createdLikeId}, {new: true});
        if (!updatedPostLikes) {
            throw new Error('Can not add like to post');
        }

        return updatedPostLikes;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
