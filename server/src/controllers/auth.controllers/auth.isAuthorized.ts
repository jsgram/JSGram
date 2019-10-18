import { Request, Response, NextFunction } from 'express';
import { unauthorizedError } from '../../common.constants/errors.constants';
import { decodeJWT } from '../../helpers/jwt.encoders';
import { userExist } from '../../db.requests/user.requests';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.get('x-access-token');
        if (!token) {
            throw new Error(unauthorizedError.message);
        }

        const data = decodeJWT(token, process.env.SECRET_KEY);
        if (!data) {
            throw new Error(unauthorizedError.message);
        }
        const {email}: any = data;

        const user = await userExist(email, next);
        if (!user) {
            throw new Error(unauthorizedError.message);
        }
        res.locals.user = user;
        next();
    } catch (e) {
        console.error(e);
        next(unauthorizedError);
    }
};
