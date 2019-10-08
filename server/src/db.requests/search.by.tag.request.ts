import { NextFunction } from 'express';
import { Tag } from '../models/tag.model';
import { SEARCH_INFO_PER_PAGE } from '../common.constants/getPosts.constants';

export const findTags = async (query: string, skip: number, next: NextFunction):
    Promise<any> => {
    try {
        const tags = await Tag.find({ tagName : { $regex: query, $options: 'i' } })
            .limit(SEARCH_INFO_PER_PAGE)
            .skip(skip);

        if (!tags) {
            throw new Error('Can not find tags');
        }

        return tags;
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
