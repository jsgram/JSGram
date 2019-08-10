import {NextFunction, Request, Response} from 'express';
import {Token} from '../../models/token.model';
import {User} from '../../models/user.model';

export const confirm = async (req: Request,
                              res: Response,
                              next: NextFunction) => {
    try {
        const tokenFromEmail: string = req.params.token;

        const token = await Token.findOne({token: tokenFromEmail});

        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        const VerifiedUser = await User.findOneAndUpdate(
            {_id: token.user},
            {isVerified: true},
            {new: true});

        res.redirect(`${process.env.FRONT_PATH}/${tokenFromEmail}`);
    } catch (e) {
        next(e);
    }
};
