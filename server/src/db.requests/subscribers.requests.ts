import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';

export const findUser = async (username: string, next: NextFunction):
    Promise<IUserModel | null | void> => {
    try {
        const user = await User.findOne({username});
        if (!user) {
            throw new Error('Can not find user');
        }

        return user;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};

export const findSubscribers = async (subscribers: string[], skip: number, next: NextFunction):
    Promise<any> => {
    try {
        const users = await User.find({_id: {$in: subscribers}}).limit(20).skip(skip);
        if (!users) {
            throw new Error('Can not show users\' subscribers');
        }

        const necessarySubscribersInfo = users.map((user: IUserModel) => {
            const {_id, username, photoPath}: IUserModel = user;
            return{
                _id,
                username,
                photoPath,
            };
        });

        return necessarySubscribersInfo;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
