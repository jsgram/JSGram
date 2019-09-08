import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';

export const checkFollowing = async (loggedUserId: string, followingUserId: string, next: NextFunction):
    Promise<number | null | void> => {
    try {
        return await User.countDocuments({_id: loggedUserId, following: followingUserId});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};

export const addToLoggedUserIdFollowingUserId = async (loggedUserId: string, followingUserId: string,
                                                       next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const loggedUserIdWithFollowingUserId = await User.findOneAndUpdate({_id: loggedUserId},
            {$push: {following: followingUserId}}, {new: true});
        if (!loggedUserIdWithFollowingUserId) {
            throw new Error('Can not follow this user');
        }

        return loggedUserIdWithFollowingUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};

export const addFollowingUserIdToLoggedUserId = async (followingUserId: string, loggedUserId: string,
                                                       next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const followingUserIdWithLoggedUserId = await User.findOneAndUpdate({_id: followingUserId},
            {$push: {followers: loggedUserId}}, {new: true});
        if (!followingUserIdWithLoggedUserId) {
            throw new Error('Can not follow this user');
        }

        return followingUserIdWithLoggedUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
