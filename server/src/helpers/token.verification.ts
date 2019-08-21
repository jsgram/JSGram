import { Response, NextFunction } from 'express';
import { decodeJWT } from './jwt.encoders';
import { userExist } from '../db.requests/user.requests';

export const tokenVerification =
    async (token: string, res: Response, next: NextFunction): Promise<any> => {
        try {
            if (!token) {
                return res.status(401);
            }

            const data = decodeJWT(token, process.env.SECRET_KEY);
            if (!data) {
                return res.status(401);
            }
            const {email}: any = data;

            const user = await userExist(email, next);
            if (!user) {
                return res.status(401);
            }

            return user;
        } catch (e) {
            next({status: 401, message: 'Unauthorized'});
        }
    };
