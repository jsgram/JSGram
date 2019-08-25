import {NextFunction, Request, Response} from 'express';
import { deleteToken, isTokenExist } from '../../db.requests/token.requests';
import {verificateUser} from '../../db.requests/user.requests';

export const confirm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: any = req.params; // FIXME

        const token = await isTokenExist(tokenFromEmail, next);
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const updatedUser = await verificateUser(token.user, next);
        if (!updatedUser) {
            throw new Error('User does not exist');
        }

        const removeToken = await deleteToken(token.id, next);
        if (!removeToken) {
            throw new Error('Token does not remove');
        }

        res.redirect(`${process.env.FRONT_PATH}/login`);
    } catch (e) {
        next({message: 'User has not been authenticated', status: 409});
    }
};
