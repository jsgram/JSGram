import {NextFunction, Request, Response} from 'express';
import {Token} from '../../models/token.model';
import {User} from '../../models/user.model';

export const confirm = async (req: Request,
                              res: Response,
                              next: NextFunction) => {
    try {
        const tokenEmail: string = req.params.token;

        const token = await Token.findOne({token: tokenEmail});
        if (!token) {
            throw new Error(`Token doesn't exist`);
        }

        await User.findOneAndUpdate(token.user,
            {isVerified: true},
            {new: true});

        res.redirect('/user');
    } catch (e) {
        next(e);
    }
};
