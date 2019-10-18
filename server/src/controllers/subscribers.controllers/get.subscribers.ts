import { NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import { findUser, findSubscribers } from '../../db.requests/subscribers.requests';
import { SUBSCRIBERS_PER_PAGE } from '../../common.constants/getPosts.constants';
import { serverError } from '../../common.constants/errors.constants';

export const getSubscribers = async (username: string, subscribers: any, page: number, next: NextFunction):
    Promise<IUserModel[] | null | void> => {
    try {
        const profileUser = await findUser(username, next);
        if (!profileUser) {
            const message = 'Can not find user';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const { followers, following }: IUserModel = profileUser as IUserModel;

        const checkSubscribers = subscribers === 'followers' ? followers : following;

        const skip = (page - 1) * SUBSCRIBERS_PER_PAGE;

        const users = await findSubscribers(checkSubscribers, skip, next);
        if (!users) {
            const message = 'Can not show users\' followers';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        return users;
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
