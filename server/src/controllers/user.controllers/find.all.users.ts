import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/user.model';
import { serverError } from '../../common.constants/errors.constants';

export const findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(await User.find({}));
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
