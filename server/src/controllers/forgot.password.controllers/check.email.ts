import {Request, Response, NextFunction} from 'express';
import {IUserModel} from '../../models/user.model';
import {sendEmail} from '../../helpers/send.email';
import {userExist} from '../../db.requests/user.requests';
import {forgotPasswordMessage} from '../../helpers/send.email.message';

export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email}: IUserModel = req.body;
        if (!email) {
            throw new Error('Email field is empty');
        }

        const user = await userExist(email, next);
        if (!user) {
            throw new Error('The email address you have entered isn\'t ' +
                'associated with another account');
        }

        await sendEmail(user, forgotPasswordMessage, next);

        res.json(
            {status: `To change your password, please check your email: ${email}`});
    } catch (e) {
        next({message: 'The email address you have entered isn\'t ' +
                'associated with another account', status: 409});
    }
};
