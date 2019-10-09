import { Request, Response, NextFunction } from 'express';
import { findTags } from '../../db.requests/search.by.tag.request';
import { SEARCH_INFO_PER_PAGE } from '../../common.constants/getPosts.constants';

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
        const results = await findTags(query, skip, next);

        if (!results) {
            throw new Error('Can not find tag');
        }

        res.json({ results });
    } catch (e) {
        next(e);
    }
};
