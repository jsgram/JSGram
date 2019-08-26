import { Request, Response, NextFunction } from 'express';
import { tokenVerification } from '../../helpers/token.verification';
import { IUserModel } from '../../models/user.model';

export const getNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            res.redirect(`${process.env.FRONT_PATH}/login`);
            throw new Error('Token does not exist');
        }

        const user = await tokenVerification(token, res, next);
        if (!user) {
            throw new Error('User does not exist');
        }
        const {fullName, email}: IUserModel = user;

        res.json({
            fullName,
            email,
        });
    } catch (e) {
        next(e);
    }
};
