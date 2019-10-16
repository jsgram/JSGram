import { NextFunction, Request, Response } from 'express';
import { findPostById } from '../../db.requests/find.post.by.id';
import { serverError } from '../../common.constants/errors.constants';

interface IParams {
    id: string;
}

export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id}: IParams = req.params;
        const post = await findPostById(id, next);
        res.json({post});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
