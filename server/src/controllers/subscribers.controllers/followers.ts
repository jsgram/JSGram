import { Request, Response, NextFunction } from 'express';
import { getSubscribers } from './get.subscribers';
import { serverError } from '../../common.constants/errors.constants';

export const getFollowers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {username, page}}: { params: { username: string, page: number } } = req;

        const users = await getSubscribers(username, 'followers', page, next);

        if (!users) {
            const message = 'Can not show users\' followers';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({users});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
