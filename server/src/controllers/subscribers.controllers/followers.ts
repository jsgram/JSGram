import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import { findSubscribers } from '../../db.requests/subscribers.requests';

export const getFollowers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {followers}: IUserModel = res.locals.user;

        const users = await findSubscribers(followers, next);
        if (!users.length) {
            throw new Error('User does not have followers');
        }

        res.json({users});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
