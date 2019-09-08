import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';

export const removeFollowingUserId = async (loggedUserId: string, followingUserId: string, next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const removedFollowingUserIdFromLoggedUserId =
            await User.findOneAndUpdate({_id: loggedUserId}, {$pull: {following: followingUserId}}, {new: true});
        if (!removedFollowingUserIdFromLoggedUserId) {
            throw new Error('Can not unfollow this user');
        }

        return removedFollowingUserIdFromLoggedUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};

export const removeLoggedUserId = async (loggedUserId: string, followingUserId: string, next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const removedLoggedUserIdFromFollowingUserId =
            await User.findOneAndUpdate({_id: followingUserId}, {$pull: {followers: loggedUserId}}, {new: true});
        if (!removedLoggedUserIdFromFollowingUserId) {
            throw new Error('Can not unfollow this user');
        }

        return removedLoggedUserIdFromFollowingUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
