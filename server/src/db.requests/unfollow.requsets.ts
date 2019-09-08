import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';

export const unfollowByUserId = async (userIdToUpdate: string, userIdToRemove: string,
                                       fieldToUpdate: string, next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const removedLoggedUserIdFromFollowingUserId =
            await User.findOneAndUpdate({_id: userIdToUpdate}, {$pull: {[fieldToUpdate]: userIdToRemove}}, {new: true});
        // @ts-ignore
        console.log(1111, removedLoggedUserIdFromFollowingUserId.followers);
        // @ts-ignore
        console.log(2222, removedLoggedUserIdFromFollowingUserId.following);
        if (!removedLoggedUserIdFromFollowingUserId) {
            throw new Error('Can not unfollow this user');
        }

        return removedLoggedUserIdFromFollowingUserId;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
