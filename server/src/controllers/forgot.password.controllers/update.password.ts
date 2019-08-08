import {NextFunction, Request, Response} from 'express';
import {Token} from '../../models/token.model';
import {User} from '../../models/user.model';
import bcrypt from 'bcrypt';

export const updatePassword = async (req: Request,
                                     res: Response,
                                     next: NextFunction) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const tokenExist = await Token.findOne({token});
        if (!tokenExist) {
            throw new Error(`Token doesn't exist`);
        }

        const saltRounds: number = 12;

        const salt: string = bcrypt.genSaltSync(saltRounds);
        const hash: string = bcrypt.hashSync(password, salt);

        const userWithNewPassword = await User.findByIdAndUpdate(
            {_id: tokenExist.user},
            {password: hash},
            {new: true},
        );

        res.json({userWithNewPassword});
    } catch (e) {
        next(e);
    }
};
