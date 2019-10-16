import { User } from '../../../models/user.model';
import { Token, ITokenModel } from '../../../models/token.model';
import { sendEmail } from '../../../helpers/send.email';
import { renderTemplate } from '../../../helpers/render.template';
import { encodeJWT } from '../../../helpers/jwt.encoders';

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
            const message = 'Unauthorized attempt to edit profile.';

            console.warn(new Error(message));
            next({ message, status: 401 });
        }
        if (Validator.isEmpty(newEmail)) {
            const message = 'Email is empty.';

            console.warn(new Error(message));
            next({ message, status: 426 });
        }

        const anotherUser = await User.findOne({ email: newEmail });
        if (anotherUser) {
            const message = 'Cannot change email.';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const token = encodeJWT(email, process.env.SECRET_KEY);

        const emailSubject = 'JSgram - Change Email';
        const emailBody = renderTemplate('change.email.pug', { user, newEmail, email, token });

        const successSend = await sendEmail(user, emailSubject, emailBody);
        if (!successSend) {
            const message = 'Email wasn\'t sent.';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({ status: `Verification email has been sent to ${newEmail}.` });
    } catch (e) {
        console.error(e);
        next({ message: 'Cannot change email', status: 500 });
    }
};
