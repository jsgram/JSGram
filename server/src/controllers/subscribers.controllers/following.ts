import {Request, Response, NextFunction} from 'express';
import { IUserModel } from '../../models/user.model';
import { findSubscribers } from '../../db.requests/subscribers.requests';

export const getFollowing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {following}: IUserModel = res.locals.user;

        const users = await findSubscribers(following, next);
        if (!users) {
            throw new Error('Can not show users\' following');
        }

        res.json({users});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
