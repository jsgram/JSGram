import { NextFunction, Request, Response } from 'express';
import { IUserModel } from '../../models/user.model';
import { unfollowByUserId } from '../../db.requests/unfollow.requsets';
import { serverError } from '../../common.constants/errors.constants';

export const unfollow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {id: followingUserId}}: {params: IUserModel} = req;
        const {locals: {user: {_id: loggedUserId}}}: { locals: { user: IUserModel } } = res;

        const removedFollowingUserIdFromLoggedUserId =
            await unfollowByUserId(loggedUserId, followingUserId, 'following', next);
        if (!removedFollowingUserIdFromLoggedUserId) {
            const message = 'Can not unfollow this user';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const removedLoggedUserIdFromFollowingUserId =
            await unfollowByUserId(followingUserId, loggedUserId, 'followers', next);
        if (!removedLoggedUserIdFromFollowingUserId) {
            const message = 'Can not unfollow this user';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({
            message: 'User unfollowed successfully',
            updatedLoggedUser: removedFollowingUserIdFromLoggedUserId,
            updatedFollowingUserId: removedLoggedUserIdFromFollowingUserId,
        });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
