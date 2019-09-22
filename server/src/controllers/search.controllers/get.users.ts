import { Request, Response, NextFunction } from 'express';
import { findUsers } from '../../db.requests/search.request';
import { SEARCH_INFO_PER_PAGE } from '../../common.constants/getPosts.constants';

interface IParams {
    params: {
        query: string;
        page: number;
    };
}

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {query, page}}: IParams = req;
        const skip = (page - 1) * SEARCH_INFO_PER_PAGE;
        const users = await findUsers(query, skip, next);

        if (!users) {
            throw new Error('Can not find user');
        }

        res.json({ users });
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
