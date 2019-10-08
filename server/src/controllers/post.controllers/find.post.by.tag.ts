import { NextFunction, Request, Response } from 'express';
import { findPostByTag } from '../../db.requests/find.post.by.tag';
import { POSTS_PER_PAGE } from '../../common.constants/getPosts.constants';

interface IParams {
    tagName: string;
    page: number;
}

export const findByTagName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { tagName, page }: IParams = req.params;
        const skip = (page - 1) * POSTS_PER_PAGE;
        const posts = await findPostByTag(tagName, skip, POSTS_PER_PAGE);
        res.json(posts);
    } catch (e) {
        next(e);
    }
};
