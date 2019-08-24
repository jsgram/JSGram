import { Request, Response, NextFunction } from 'express';
import { tokenVerification } from '../../helpers/token.verification';
import { unauthorizedError } from '../../common.constants/errors.constants';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.get('x-access-token');
        if (!token) {
            return next(unauthorizedError);
        }

        const user = await tokenVerification(token, res, next);
        if (!user) {
            return next(unauthorizedError);
        }
        res.locals.user = user;
        next();
    } catch (e) {
        next(unauthorizedError);
    }
};
