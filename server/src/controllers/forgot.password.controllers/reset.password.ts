import {NextFunction, Request, Response} from 'express';
import {ITokenModel} from '../../models/token.model';
import {isTokenExist} from '../../db.requests/token.requsets';

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: ITokenModel = req.params;

        const token = await isTokenExist(tokenFromEmail, next);
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const newToken = token.token;
        res.redirect(`${process.env.FRONT_PATH}/${newToken}`);
    } catch (e) {
        next(e);
    }
};
