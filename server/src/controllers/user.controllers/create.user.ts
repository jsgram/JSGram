import { User, IUserModel } from '../../models/user.model';
import { Token, ITokenModel } from '../../models/token.model';
import { hashPassword } from '../../helpers/hash.password';
import validateInput, { IValidationError } from '../../helpers/validation';
import { sendEmail } from '../../helpers/send.email';
import { renderTemplate } from '../../helpers/render.template';
import { serverError } from '../../common.constants/errors.constants';

import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const createUser = async (user: IUserModel, next: NextFunction): Promise<IUserModel | void> => {
    try {
        const {
            email,
            fullName,
            username,
            password,
            createdAt,
            photoPath,
            bio,
            isAdmin,
            isVerified,
            posts,
        }: IUserModel = user;

        const emailExist = await User.countDocuments({email});
        if (emailExist) {
            const message = 'The email address you have entered is already associated with another account';

            console.warn(new Error(message));
            next({ message, status: 409 });
        }

        const userCreated = await User.create({
            email,
            fullName,
            username,
            password: hashPassword(password),
            createdAt,
            photoPath,
            bio,
            isAdmin,
            isVerified,
            posts,
        });

        return userCreated;
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { errors, isValid }: { errors: IValidationError, isValid: boolean } = validateInput(req.body);
        if (!isValid) {
            res.json(errors);
            return;
        }

        const user = await createUser(req.body, next);
        if (!user) {
            const message = 'Cannot create user.';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const { token }: ITokenModel = await Token.create({
            user: (user as IUserModel)._id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const emailSubject = 'JSgram - Create User';
        const emailBody = renderTemplate('create.user.pug', { user, token });

        const successSend = await sendEmail(user as IUserModel, emailSubject, emailBody);
        if (!successSend) {
            const message = 'Email wasn\'t sent.';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({ status: `A verification email has been sent to ${(user as IUserModel).email}.` });
    } catch (e) {
        console.error(e);
        next({ message: 'Cannot create user.', status: 500 });
    }
};
