import { NextFunction, Request, Response } from 'express';
import { sendChangingEmail } from '../../../helpers/send.email';
import { changeEmailMessage } from '../../../helpers/send.email.change.email';
import Validator from 'validator';
import {User} from '../../../models/user.model';

interface IChangeEmail {
    newEmail: string;
    profileUser: {
        email: string;
        _id: string;
    };
}

export const changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { newEmail, profileUser: {email, _id: userId} }: IChangeEmail = req.body;
        const { locals: { user: { id: loggedUserId } } }: Response = res;
        if (loggedUserId !== userId) {
            throw new Error('Unauthorized attempt to edit profile');
        }
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
        if (e.message) {
            next({ message: e.message, status: 400 });
        } else {
            next({message: 'Can not change email', status: 500});
        }
    }
};
