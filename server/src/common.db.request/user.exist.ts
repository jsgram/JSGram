import {NextFunction} from 'express';
import {IUserModel, User} from '../models/user.model';

export const userExist = async (email: string, next: NextFunction): Promise<IUserModel | void | null> => {
    try {
        return await User.findOne({email});
    } catch (e) {
        next(e);
    }
};
