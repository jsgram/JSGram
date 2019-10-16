import { NextFunction, Request, Response } from 'express';

import { Token, ITokenModel } from '../../models/token.model';

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: any = req.params;

        const token = await Token.findOne({token: tokenFromEmail});
        if (!token) {
            const message = 'Token doesn\'t exist';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const newToken = (token as ITokenModel).token;
        res.redirect(`${process.env.FRONT_PATH}/password-reset/${newToken}`);
    } catch (e) {
        console.error(e);
        next({message: 'Password has not been reset', status: 500});
    }
};
