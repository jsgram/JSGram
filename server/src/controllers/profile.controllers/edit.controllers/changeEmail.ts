import { User } from '../../../models/user.model';
import { Token, ITokenModel } from '../../../models/token.model';
import { sendEmail } from '../../../helpers/send.email';
import { renderTemplate } from '../../../helpers/render.template';

import crypto from 'crypto';
import Validator from 'validator';
import { NextFunction, Request, Response } from 'express';

interface IChangeEmail {
    newEmail: string;
    profileUser: {
        email: string;
        _id: string;
    };
}

export const changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { newEmail, profileUser: { email, _id: userId } }: IChangeEmail = req.body;

        const { locals: { user, user: { id: loggedUserId } } }: Response = res;
        if (loggedUserId !== userId) {
            throw new Error('Unauthorized attempt to edit profile.');
        }
        if (Validator.isEmpty(newEmail)) {
            throw new Error('Email is empty.');
        }

        const anotherUser = await User.findOne({ email: newEmail });
        if (anotherUser) {
            throw new Error('Cannot change email.');
        }

        const { token }: ITokenModel = await Token.create({
            user: userId,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const emailSubject = 'JSgram - Create User';
        const emailBody = renderTemplate('change.email.pug', { user, newEmail, email, token });

        const successSend = await sendEmail(user, emailSubject, emailBody);
        if (!successSend) {
            throw new Error('Email wasn\'t sent.');
        }

        res.json({ status: `Verification email has been sent to ${newEmail}.` });
    } catch (e) {
        if (e.message) {
            next({ message: e.message, status: 400 });
        } else {
            next({ message: 'Cannot change email', status: 500 });
        }
    }
};
