import {NextFunction, Request, Response} from 'express';
import { deleteToken, isTokenExist } from '../../db.requests/token.requests';
import {verificateUser} from '../../db.requests/user.requests';
import { ITokenModel } from '../../models/token.model';

export const confirm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: any = req.params; // FIXME

        const token = await isTokenExist(tokenFromEmail, next);
        if (!token) {
            const message = 'Token doesn\'t exist';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const updatedUser = await verificateUser((token as ITokenModel).user, next);
        if (!updatedUser) {
            const message = 'User does not exist';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const removeToken = await deleteToken((token as ITokenModel).id, next);
        if (!removeToken) {
            const message = 'Could not remove token';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.redirect(`${process.env.FRONT_PATH}/login`);
    } catch (e) {
        console.error(e);
        next({message: 'User has not been authenticated', status: 401});
    }
};
