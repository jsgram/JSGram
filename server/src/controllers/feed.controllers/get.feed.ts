import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';

export const getFeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {_id, username, email}: IUserModel = res.locals.user;

        res.json({
            _id,
            username,
            email,
        });
    } catch (e) {
        return next(e);
    }
};
