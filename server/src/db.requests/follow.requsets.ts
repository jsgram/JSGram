import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';

export const checkFollowing = async (loggedUserId: string, followingUserId: string, next: NextFunction):
    Promise<IUserModel | number | null | void> => {
    try {
        return await User.countDocuments({_id: loggedUserId, following: followingUserId});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};

export const followByUserId = async (userIdToUpdate: string, userIdToAdd: string,
                                     fieldToUpdate: string, next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const followingUserIdWithLoggedUserId = await User.findOneAndUpdate({_id: userIdToUpdate},
            {$push: {[fieldToUpdate]: userIdToAdd}}, {new: true});
        if (!followingUserIdWithLoggedUserId) {
            throw new Error('Can not follow this user');
        }

        return followingUserIdWithLoggedUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
