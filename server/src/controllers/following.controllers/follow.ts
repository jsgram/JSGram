import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import {
    checkFollowing,
    addToLoggedUserIdFollowingUserId,
    addFollowingUserIdToLoggedUserId,
} from '../../db.requests/follow.requsets';

export const follow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {_id: followingUserId}: IUserModel = req.body;
        const { locals : { user: { _id: loggedUserId} } }: {locals: {user: IUserModel}} = res;

        if (!followingUserId) {
            throw new Error('No followingUserId');
        }

        const alreadyFollow = await checkFollowing(loggedUserId, followingUserId, next);
        if (alreadyFollow) {
            throw new Error('You have already followed this user');
        }

        const loggedUserIdWithFollowingUserId =
            await addToLoggedUserIdFollowingUserId(loggedUserId, followingUserId, next);
        if (!loggedUserIdWithFollowingUserId) {
            throw new Error('Can not follow this user');
        }

        const followingUserIdWithLoggedUserId =
            await addFollowingUserIdToLoggedUserId(followingUserId, loggedUserId, next);
        if (!followingUserIdWithLoggedUserId) {
            throw new Error('Can not follow this user');
        }

        res.json({
            message: 'User followed successfully',
            updatedLoggedUser: loggedUserIdWithFollowingUserId,
            updatedFollowingUserId: followingUserIdWithLoggedUserId,
        });
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
