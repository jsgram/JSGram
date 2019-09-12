import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import { findUser, findSubscribers } from '../../db.requests/subscribers.requests';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';

export const getSubscribers = async (username: string, subscribers: any, page: number, next: NextFunction):
    Promise<IUserModel[] | null | void> => {
    try {
        const profileUser = await findUser(username, next);
        if (!profileUser) {
            throw new Error('Can not find user');
        }

        const {followers, following}: IUserModel = profileUser;

        const checkSubscribers = subscribers === 'followers' ? followers : following;

        const skip = (page - 1) * POSTS_PER_PAGE;

        const users = await findSubscribers(checkSubscribers, skip, next);
        if (!users) {
            throw new Error('Can not show users\' followers');
        }

        return users;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
