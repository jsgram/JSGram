import {NextFunction, Request, Response} from 'express';
import {ITokenModel, Token} from '../../models/token.model';
import {User} from '../../models/user.model';
import {tokenExist} from '../../common.db.request/token.exist';

export const confirm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: ITokenModel = req.params;

        const token = await tokenExist(tokenFromEmail, next);
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const userExist = await User.findOneAndUpdate(
            {_id: token.user},
            {isVerified: true},
            {new: true});
        if (!userExist) {
            throw new Error('User does not exist');
        }

        const removeToken = await Token.findByIdAndRemove(token.id);
        if (!removeToken) {
            throw new Error('Token does not remove');
        }

        res.redirect(`${process.env.FRONT_PATH}/login`);
    } catch (e) {
        next(e);
    }
};
