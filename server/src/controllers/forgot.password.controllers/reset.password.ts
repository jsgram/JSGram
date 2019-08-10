import {NextFunction, Request, Response} from 'express';
import {Token} from '../../models/token.model';

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const tokenFromEmail: string = req.params.token;

        const token = await Token.findOne({token: tokenFromEmail});
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const newToken = token.token;
        res.redirect(`${process.env.FRONT_PATH}/${newToken}`);
    } catch (e) {
        next(e);
    }
};
