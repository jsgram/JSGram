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
            const message = 'Email field is empty.';

            console.warn(new Error(message));
            next({ message, status: 422 });
        }

        const user = await userExist(email, next);
        if (!user) {
            const message = 'Email does not exist.';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const { token }: ITokenModel = await Token.create({
            user: _id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const emailSubject = 'JSgram - Resend Token';
        const emailBody = renderTemplate('resend.token.pug', { username, token });

        const successSend = await sendEmail(user as IUserModel, emailSubject, emailBody);
        if (!successSend) {
            const message = 'Email wasn\'t sent.';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({ text: `Verification email has been sent to ${email}.` });
    } catch (e) {
        console.error(e);
        next({ message: 'Verification email was not send to user.', status: 500 });
    }
};
