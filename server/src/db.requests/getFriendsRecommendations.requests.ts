import { User } from '../models/user.model';
import { NextFunction } from 'express';

export interface IUser {
    following: object[];
    _id: string;
}

export const findUser = async (id: number, next: NextFunction): Promise<IUser | void | null> => {
    try {
        const user = await User.findById(id)
            .select('following')
            .populate('following', 'following');

        if (!user) {
            throw new Error('User does not exist');
        }

        return user;
    } catch (e) {
        next({status: 409, message: 'User does not exist'});
    }
};

export const findUsers = async (listOfUsers: string[]): Promise<object[]> => {
    const users = await User.find({_id: {$in: listOfUsers}})
        .select('username photoPath');

    return users.sort((a: any, b: any) => listOfUsers.findIndex((id: string) => a._id.equals(id)) -
                                          listOfUsers.findIndex((id: string) => b._id.equals(id)));
};
