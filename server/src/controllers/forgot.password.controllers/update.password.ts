import {NextFunction, Request, Response} from 'express';
import {Token} from '../../models/token.model';
import {IUserModel} from '../../models/user.model';
import { deleteToken, isTokenExist } from '../../db.requests/token.requests';
import {changePassword} from '../../db.requests/user.requests';
import { serverError } from '../../common.constants/errors.constants';

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: any = req.params;
        const {password}: IUserModel = req.body;

        const token = await isTokenExist(tokenFromEmail, next);
        if (!token) {
            const message = 'Token doesn\'t exist';

            console.warn(new Error(message));
            next({ message, status: 426 });
            throw new Error();
        }

        const userWithNewPassword = await changePassword(token.user, password, next);
        if (!userWithNewPassword) {
            const message = 'Password has not been update';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const removeToken = await deleteToken(token.id, next);
        if (!removeToken) {
            const message = 'Token has not been remove';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({userWithNewPassword});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
