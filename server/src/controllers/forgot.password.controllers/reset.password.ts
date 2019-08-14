import {NextFunction, Request, Response} from 'express';
import {ITokenModel, Token} from '../../models/token.model';

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: ITokenModel = req.params;

        const token = await Token.findOne({token: tokenFromEmail});
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const newToken = token.token;
        res.redirect(`${process.env.FRONT_PATH}/password-reset/${newToken}`);
    } catch (e) {
        next({message: 'Password does not reset', status: 409});
    }
};
