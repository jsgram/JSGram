import { NextFunction, Request, Response } from 'express';
import { findPostById } from '../../db.requests/find.post.by.id';

interface IParams {
    id: string;
}

export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id}: IParams = req.params;
        const post = await findPostById(id, next);
        res.json({post});
    } catch (e) {
        next(e);
    }
};
