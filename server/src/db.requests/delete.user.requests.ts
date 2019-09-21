import { NextFunction } from 'express';
import { User, IUserModel } from '../models/user.model';

export const deleteUser = async (userId: string, next: NextFunction):
    Promise<IUserModel | void> => {
    try {
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            throw new Error(`Database error while deleting user ${userId}.`);
        }

        return deletedUser;
    } catch (e) {
        next({ status: 409, message: e.message });
    }
};
