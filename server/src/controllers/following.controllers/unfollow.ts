import { NextFunction, Request, Response } from 'express';
import { IUserModel } from '../../models/user.model';
import { unfollowByUserId } from '../../db.requests/unfollow.requsets';

export const unfollow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id: followingUserId}: IUserModel = req.params;
        const {locals: {user: {_id: loggedUserId}}}: { locals: { user: IUserModel } } = res;

        const removedFollowingUserIdFromLoggedUserId =
            await unfollowByUserId(followingUserId, loggedUserId, 'following', next);
        if (!removedFollowingUserIdFromLoggedUserId) {
            throw new Error('Can not unfollow this user');
        }

        const removedLoggedUserIdFromFollowingUserId =
            await unfollowByUserId(followingUserId, loggedUserId, 'followers', next);
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
