import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import {
    checkFollowing, followByUserId,
} from '../../db.requests/follow.requsets';

export const follow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {body: {_id: followingUserId}}: {body: IUserModel} = req;
        const {locals: {user: {_id: loggedUserId}}}: { locals: { user: IUserModel } } = res;

        if (!followingUserId) {
            throw new Error('No followingUserId');
        }

        const alreadyFollow = await checkFollowing(loggedUserId, followingUserId, next);
        if (alreadyFollow) {
            throw new Error('You have already followed this user');
        }

        const loggedUserIdWithFollowingUserId =
            await followByUserId(loggedUserId, followingUserId, 'following', next);
        if (!loggedUserIdWithFollowingUserId) {
            throw new Error('Can not follow this user');
        }

        const followingUserIdWithLoggedUserId =
            await followByUserId(followingUserId, loggedUserId, 'followers', next);

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
