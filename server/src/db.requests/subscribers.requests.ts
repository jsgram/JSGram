import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';

export const findSubscribers = async (following: IUserModel[], next: NextFunction):
    Promise<any> => {
    try {
        const users = await User.find({_id: {$in: following}});
        if (!users) {
            throw new Error('Can not show users\' subscribers');
        }

        return users;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
