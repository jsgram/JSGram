import {NextFunction, Request, Response} from 'express';
import {User} from '../../models/user.model';
import { serverError } from '../../common.constants/errors.constants';

export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(await User.findById(req.params.id));
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
