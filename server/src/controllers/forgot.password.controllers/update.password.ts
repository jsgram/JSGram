import {NextFunction, Request, Response} from 'express';
import {ITokenModel, Token} from '../../models/token.model';
import {IUserModel} from '../../models/user.model';
import {isTokenExist} from '../../db.requests/token.requests';
import {changePassword} from '../../db.requests/user.requests';

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: ITokenModel = req.params;
        const {password}: IUserModel = req.body;

        const token = await isTokenExist(tokenFromEmail, next);
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const userWithNewPassword = await changePassword(token.user, password, next);
        if (!userWithNewPassword) {
            throw new Error('Password did not update');
        }

        const removeToken = await Token.findByIdAndRemove(token.id);
        if (!removeToken) {
            throw new Error('Token does not remove');
        }

        res.json({userWithNewPassword});
    } catch (e) {
        next(e);
    }
};
