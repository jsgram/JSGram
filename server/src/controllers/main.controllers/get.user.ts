import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../models/user.model';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {username, email}: IUserModel = res.locals.user;

        res.json({
            username,
            email,
        });
    } catch (e) {
        return next(e);
    }
};
