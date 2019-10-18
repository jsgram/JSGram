import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import {
    checkFollowing, followByUserId,
} from '../../db.requests/follow.requsets';
import { serverError } from '../../common.constants/errors.constants';

export const follow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {body: {_id: followingUserId}}: {body: IUserModel} = req;
        const {locals: {user: {_id: loggedUserId}}}: { locals: { user: IUserModel } } = res;

        if (!followingUserId) {
            const message = 'No followingUserId';

            console.warn(new Error(message));
            next({ message, status: 422 });
        }

        const alreadyFollow = await checkFollowing(loggedUserId, followingUserId, next);
        if (alreadyFollow) {
            const message = 'You have already followed this user';

            console.warn(new Error(message));
            next({ message, status: 400 });
        }

        const loggedUserIdWithFollowingUserId =
            await followByUserId(loggedUserId, followingUserId, 'following', next);
        if (!loggedUserIdWithFollowingUserId) {
            const message = 'Can not follow this user';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const followingUserIdWithLoggedUserId =
            await followByUserId(followingUserId, loggedUserId, 'followers', next);

        if (!followingUserIdWithLoggedUserId) {
            const message = 'Can not follow this user';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({
            message: 'User followed successfully',
            updatedLoggedUser: loggedUserIdWithFollowingUserId,
            updatedFollowingUserId: followingUserIdWithLoggedUserId,
        });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
