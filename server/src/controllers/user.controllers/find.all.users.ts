import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/user.model';

export const findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(await User.find({}));
    } catch (e) {
        next(e);
    }
};
