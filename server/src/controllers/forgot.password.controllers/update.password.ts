import { NextFunction, Request, Response } from 'express';

import { Token, ITokenModel } from '../../models/token.model';
import { IUserModel } from '../../models/user.model';
import { deleteToken, isTokenExist } from '../../db.requests/token.requests';
import { changePassword } from '../../db.requests/user.requests';
import { serverError } from '../../common.constants/errors.constants';

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: any = req.params;
        const {password}: IUserModel = req.body;

        const token = await isTokenExist(tokenFromEmail, next);
        if (!token) {
            const message = 'Token doesn\'t exist';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const userWithNewPassword = await changePassword((token as ITokenModel).user, password, next);
        if (!userWithNewPassword) {
            const message = 'Password has not been updated';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const removeToken = await deleteToken((token as ITokenModel).id, next);
        if (!removeToken) {
            const message = 'Token has not been removed';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({userWithNewPassword});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
