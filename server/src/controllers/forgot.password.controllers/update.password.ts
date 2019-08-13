import {NextFunction, Request, Response} from 'express';
import {ITokenModel} from '../../models/token.model';
import {IUserModel, User} from '../../models/user.model';
import {tokenExist} from '../../common.db.request/token.exist';
import {hashPassword} from '../../helpers/hash.password';

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: ITokenModel = req.params;
        const {password}: IUserModel = req.body;

        const token = await tokenExist(tokenFromEmail, next);
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const userWithNewPassword = await User.findByIdAndUpdate(
            {_id: token.user},
            {password: hashPassword(password)},
            {new: true},
        );

        res.json({userWithNewPassword});
    } catch (e) {
        next(e);
    }
};
