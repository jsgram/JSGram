import {NextFunction, Request, Response} from 'express';
import {ITokenModel} from '../../models/token.model';
import {User} from '../../models/user.model';
import {tokenExist} from '../../common.db.request/token.exist';

export const confirm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token: tokenFromEmail}: ITokenModel = req.params;

        const token = await tokenExist(tokenFromEmail, next);
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        await User.findOneAndUpdate(
            {_id: token.user},
            {isVerified: true},
            {new: true});

        res.redirect(`${process.env.FRONT_PATH}/${tokenFromEmail}`);
    } catch (e) {
        next(e);
    }
};
