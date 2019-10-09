import { IUserModel } from '../../models/user.model';
import { Token, ITokenModel } from '../../models/token.model';
import { userExist } from '../../db.requests/user.requests';
import { sendEmail } from '../../helpers/send.email';
import { renderTemplate } from '../../helpers/render.template';

import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id, email, username }: IUserModel = req.body;
        if (!email) {
            throw new Error('Email field is empty');
        }

        const user = await userExist(email, next);
        if (!user) {
            throw new Error('The email address you have entered isn\'t associated with JSgram account.');
        }

        const { token }: ITokenModel = await Token.create({
            user: _id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const emailSubject = 'JSgram - Reset Password';
        const emailBody = renderTemplate('reset.password.pug', { user, token });

        const successSend = await sendEmail(user, emailSubject, emailBody);
        if (!successSend) {
            throw new Error('Email wasn\'t sent.');
        }

        res.json({ status: `To change your password, please check your email: ${email}.` });
    } catch (e) {
        next({ message: 'The email address you have entered isn\'t associated with JSgram account.', status: 409 });
    }
};
