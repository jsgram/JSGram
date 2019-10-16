import { Request, Response, NextFunction } from 'express';
import { serverError } from '../../common.constants/errors.constants';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user: { _id, username, email, photoPath, isAdmin } } }: Response = res;

        res.json({
            _id,
            username,
            email,
            photoPath,
            isAdmin,
        });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
