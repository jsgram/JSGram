import { Request, Response, NextFunction } from 'express';
import { tokenVerification } from '../../helpers/token.verification';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.get('x-access-token');
        if (!token) {
            return next({status: 401, message: 'Unauthorized'});
        }

        const user = await tokenVerification(token, res, next);
        if (!user) {
            return next({status: 401, message: 'Unauthorized'});
        }
        res.locals.user = user;
        next();
    } catch (e) {
        next({status: 401, message: 'Unauthorized'});
    }
};
