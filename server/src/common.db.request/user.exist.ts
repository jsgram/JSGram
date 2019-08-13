import {NextFunction} from 'express';
import {IUserModel, User} from '../models/user.model';

export const userExist = async (email: string, next: NextFunction): Promise<IUserModel | void | null> => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('User does not exist');
        }

        return user;
    } catch (e) {
        next(e);
    }
};
