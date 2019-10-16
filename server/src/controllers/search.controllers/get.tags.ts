import { Request, Response, NextFunction } from 'express';
import { findTags } from '../../db.requests/search.by.tag.request';
import { SEARCH_INFO_PER_PAGE } from '../../common.constants/getPosts.constants';
import { serverError } from '../../common.constants/errors.constants';

interface IParams {
    params: {
        query: string;
        page: number;
    };
}

export const getTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {query, page}}: IParams = req;
        const skip = (page - 1) * SEARCH_INFO_PER_PAGE;
        const results = await findTags(decodeURIComponent(query), skip, next);

        if (!results) {
            const message = 'Can not find tag';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        res.json({ results });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
