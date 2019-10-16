import { IUserModel } from '../../models/user.model';
import { Token, ITokenModel } from '../../models/token.model';
import { userExist } from '../../db.requests/user.requests';
import { sendEmail } from '../../helpers/send.email';
import { renderTemplate } from '../../helpers/render.template';
import { serverError } from '../../common.constants/errors.constants';

import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, username }: IUserModel = req.body;
        if (!email) {
            const message = 'Email field is empty';

            console.warn(new Error(message));
            next({ message, status: 426 });
        }

        const user = await userExist(email, next);
        if (!user) {
            const message = 'The email address you have entered isn\'t associated with JSgram account.';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const { _id }: IUserModel = user as IUserModel;
        const { token }: ITokenModel = await Token.create({
            user: _id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const emailSubject = 'JSgram - Forgot Password';
        const emailBody = renderTemplate('forgot.password.pug', { user, token });

        const successSend = await sendEmail(user as IUserModel, emailSubject, emailBody);
        if (!successSend) {
            const message = 'Email wasn\'t sent.';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({ status: `To change your password, please check your email: ${email}.` });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
