import { NextFunction, Request, Response } from 'express';
import { sendChangingEmail } from '../../../helpers/send.email';
import { changeEmailMessage } from '../../../helpers/send.email.change.email';
import Validator from 'validator';
import {User} from '../../../models/user.model';

interface IChangeEmail {
    newEmail: string;
    profileUser: {
        email: string;
    };
}

export const changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { newEmail, profileUser: {email} }: IChangeEmail = req.body;
        if (Validator.isEmpty(newEmail)) {
            throw new Error('Email is empty');
        }

        const anotherUser = await User.findOne({email: newEmail});

        if (anotherUser) {
            throw new Error('Can not change email');
        }

        await sendChangingEmail(newEmail, email, changeEmailMessage, next);

        res.json(
            {status: `A verification email has been sent to ${newEmail}`});
    } catch (e) {
        next({message: 'Can not change email', status: 500});
    }
};
