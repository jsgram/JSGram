import { NextFunction, Request, Response } from 'express';
import { decodeJWT } from '../../../helpers/jwt.encoders';
import { User } from '../../../models/user.model';
import { serverError } from '../../../common.constants/errors.constants';

interface IChangeEmailParams {
    oldEmail: string;
    email: string;
    token: string;
}

export const confirmChangeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { oldEmail, email, token }: IChangeEmailParams = req.params;

        const checkToken: any = decodeJWT(token, process.env.SECRET_KEY!);

        const updatedUser = await User.findOne({email: oldEmail});
        if (updatedUser) {
            updatedUser.email = email;
            await updatedUser.save();
        }

        res.redirect(`${process.env.FRONT_PATH}/logout`);
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
