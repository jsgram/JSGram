import { Response, NextFunction } from 'express';
import { decodeJWT } from './jwt.encoders';
import { userExist } from '../db.requests/user.requests';
import { IUserModel } from '../models/user.model';

export const tokenVerification =
    async (token: string, res: Response, next: NextFunction): Promise<IUserModel | undefined> => {
        try {
            if (!token) {
                res.redirect(`${process.env.FRONT_PATH}/login`);
            }

            const data = decodeJWT(token, process.env.SECRET_KEY);
            if (!data) {
                throw new Error('Can not decode token');
            }

            const {username}: any = data;

            const user = await userExist(username, next);
            if (!user) {
                res.redirect(`${process.env.FRONT_PASS}/login`);
                throw new Error('Not valid token');
            }

            return user;
        } catch (e) {
            next(e);
        }
    };
