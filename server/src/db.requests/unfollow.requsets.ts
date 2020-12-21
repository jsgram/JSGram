import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';

export const unfollowByUserId = async (userIdToUpdate: string, userIdToRemove: string,
                                       fieldToUpdate: string, next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const removedLoggedUserIdFromFollowingUserId =
            await User.findOneAndUpdate({_id: userIdToUpdate}, {$pull: {[fieldToUpdate]: userIdToRemove}}, {new: true});
        if (!removedLoggedUserIdFromFollowingUserId) {
            throw new Error('Can not unfollow this user');
        }

        return removedLoggedUserIdFromFollowingUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
