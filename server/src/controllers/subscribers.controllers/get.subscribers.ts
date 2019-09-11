import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import { findUser, findSubscribers } from '../../db.requests/subscribers.requests';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';

export const getSubscribers = async (username: string, subscribers: any, page: number, next: NextFunction):
    Promise<IUserModel[] | null | void> => {
    try {
        const urlUser = await findUser(username, next);
        if (!urlUser) {
            throw new Error('Can not find user');
        }

        const {followers, following}: IUserModel = urlUser;

        const checkSubscribers = (): string[] => {
            if (subscribers === 'followers') {
                return followers;
            }
            return following;
        };

        const skip = (page - 1) * POSTS_PER_PAGE;

        const users = await findSubscribers(checkSubscribers(), skip, next);
        if (!users) {
            throw new Error('Can not show users\' followers');
        }

        return users;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
