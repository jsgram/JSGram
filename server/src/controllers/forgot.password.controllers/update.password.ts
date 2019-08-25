import {NextFunction, Request, Response} from 'express';
import {Token} from '../../models/token.model';
import {IUserModel} from '../../models/user.model';
import { deleteToken, isTokenExist } from '../../db.requests/token.requests';
import {changePassword} from '../../db.requests/user.requests';

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: any = req.params;
        const {password}: IUserModel = req.body;

        const token = await isTokenExist(tokenFromEmail, next);
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const userWithNewPassword = await changePassword(token.user, password, next);
        if (!userWithNewPassword) {
            throw new Error('Password has not been update');
        }

        const removeToken = await deleteToken(token.id, next);
        if (!removeToken) {
            throw new Error('Token has not been remove');
        }

        res.json({userWithNewPassword});
    } catch (e) {
        next({message: 'Password has not been update', status: 409});
    }
};
