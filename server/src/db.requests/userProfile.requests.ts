import { User } from '../models/user.model';
import { NextFunction } from 'express';

export const findById = async (id: string, next: NextFunction): Promise<any> => {
    try {
        const user: any = await User.findById(id);
        if (!user) {
            throw new Error('There is no user with this id.');
        }
        return user;
    } catch (e) {
        next(e);
    }
};
