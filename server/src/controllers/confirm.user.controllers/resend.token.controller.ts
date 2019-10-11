import { IUserModel } from '../../models/user.model';
import { Token, ITokenModel } from '../../models/token.model';
import { userExist } from '../../db.requests/user.requests';
import { sendEmail } from '../../helpers/send.email';
import { renderTemplate } from '../../helpers/render.template';

import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const resend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id, email, username }: IUserModel = req.body;
        if (!email) {
            throw new Error('Email field is empty.');
        }

        const user = await userExist(email, next);
        if (!user) {
            throw new Error(`Email does not exist.`);
        }

        const { token }: ITokenModel = await Token.create({
            user: _id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const emailSubject = 'JSgram - Resend Token';
        const emailBody = renderTemplate('resend.token.pug', { username, token });

        const successSend = await sendEmail(user, emailSubject, emailBody);
        if (!successSend) {
            throw new Error('Email wasn\'t sent.');
        }

        res.json({ text: `Verification email has been sent to ${email}.` });
    } catch (e) {
        next({ message: 'Verification email was not send to user.', status: 409 });
    }
};
