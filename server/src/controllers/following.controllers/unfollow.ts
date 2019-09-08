import { NextFunction, Request, Response } from 'express';
import { IUserModel } from '../../models/user.model';
import { removeFollowingUserId, removeLoggedUserId } from '../../db.requests/unfollow.requsets';

export const unfollow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id: followingUserId}: IUserModel = req.params;
        const {_id: loggedUserId}: IUserModel = res.locals.user;

        const removedFollowingUserIdFromLoggedUserId = await removeFollowingUserId(followingUserId, loggedUserId, next);
        if (!removedFollowingUserIdFromLoggedUserId) {
            throw new Error('Can not unfollow this user');
        }

        const removedLoggedUserIdFromFollowingUserId = await removeLoggedUserId(followingUserId, loggedUserId, next);
        if (!removedLoggedUserIdFromFollowingUserId) {
            throw new Error('Can not unfollow this user');
        }

        res.json({
            message: 'User unfollowed successfully',
            updatedLoggedUser: removedFollowingUserIdFromLoggedUserId,
            updatedFollowingUserId: removedLoggedUserIdFromFollowingUserId,
        });
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
