import { Request, Response, NextFunction } from 'express';
import { getSubscribers } from './get.subscribers';

export const getFollowing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {username, page}}: { params: { username: string, page: number } } = req;

        const users = await getSubscribers(username, 'following', page, next);

        if (!users) {
            throw new Error('Can not show users\' following');
        }

        res.json({users});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
