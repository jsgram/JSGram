import {Request, Response, NextFunction} from 'express';
import {IUserModel} from '../../models/user.model';
import {sendEmail} from '../../helpers/send.email';
import {userExist} from '../../db.requests/user.requests';
import {resendTokenMessage} from '../../helpers/send.email.message';

export const resend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email}: IUserModel = req.body;
        if (!email) {
            throw new Error('Email field is empty');
        }

        const user = await userExist(email, next);
        if (!user) {
            throw new Error(`Email doesn't exist`);
        }

        await sendEmail(user, resendTokenMessage, next);

        res.json(
            {text: `A verification email has been sent to ${email}`});
    } catch (e) {
        next({message: 'Verification E-mail does not send to user', status: 409});
    }
};
