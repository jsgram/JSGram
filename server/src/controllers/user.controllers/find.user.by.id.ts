import {NextFunction, Request, Response} from 'express';
import {User} from '../../models/user.model';

export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(await User.findById(req.params.id));
    } catch (e) {
        next(e);
    }
};
