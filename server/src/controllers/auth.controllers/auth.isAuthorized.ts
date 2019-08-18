import { Request, Response, NextFunction } from 'express';
import { tokenVerification } from '../../helpers/token.verification';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.get('x-access-token');
        if (!token) {
            return res.status(401).redirect(`${process.env.FRONT_PATH}/login`);
        }
        const user = await tokenVerification(token, res, next);
        if (!user) {
            throw new Error('User does not exist');
        }
        res.locals.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
