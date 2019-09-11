import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';
import { findUser, findSubscribers } from '../../db.requests/subscribers.requests';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';

export const getFollowers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {username, page}}: { params: { username: string, page: number } } = req;

        const urlUser = await findUser(username, next);
        if (!urlUser) {
            throw new Error('Can not find user');
        }

        const {followers}: IUserModel = urlUser;

        const skip = (page - 1) * POSTS_PER_PAGE;

        const users = await findSubscribers(followers, skip, next);
        if (!users) {
            throw new Error('Can not show users\' followers');
        }

        res.json({users});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
