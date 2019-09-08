import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import { findSubscribers } from '../../db.requests/subscribers.requests';

export const getFollowers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {user: {followers}}: {user: IUserModel} = res.locals;

        const users = await findSubscribers(followers, next);
        if (!users) {
            throw new Error('Can not show users\' followers');
        }

        res.json({users});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
