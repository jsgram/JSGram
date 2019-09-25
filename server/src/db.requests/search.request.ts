import { NextFunction } from 'express';
import { User } from '../models/user.model';
import { SEARCH_INFO_PER_PAGE } from '../common.constants/getPosts.constants';

const escapeRegExp = (text: string): string => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const findUsers = async (query: string, skip: number, next: NextFunction):
    Promise<any> => {
    try {
        const regex = new RegExp(escapeRegExp(query), 'i');
        const users = await User.find({$or: [{fullName: regex}, {username: regex}]}, ('username photoPath fullName'))
            .limit(SEARCH_INFO_PER_PAGE)
            .skip(skip);

        if (!users) {
            throw new Error('Can not find users');
        }

        return users;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
