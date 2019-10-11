import { User, IUserModel } from '../../models/user.model';
import { Token, ITokenModel } from '../../models/token.model';
import { hashPassword } from '../../helpers/hash.password';
import validateInput, { IValidationError } from '../../helpers/validation';
import { sendEmail } from '../../helpers/send.email';
import { renderTemplate } from '../../helpers/render.template';

import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const createUser = async (user: IUserModel, next: NextFunction): Promise<IUserModel | void> => {
    try {
        const {
            email,
            fullName,
            username,
            password,
            dateOfBirth,
            createdAt,
            photoPath,
            bio,
            isAdmin,
            isVerified,
            posts,
        }: IUserModel = user;

        const emailExist = await User.countDocuments({email});
        if (emailExist) {
            throw new Error('The email address you have entered is ' +
                'already associated with another account');
        }

        const userCreated = await User.create({
            email,
            fullName,
            username,
            password: hashPassword(password),
            dateOfBirth,
            createdAt,
            photoPath,
            bio,
            isAdmin,
            isVerified,
            posts,
        });

        return userCreated;
    } catch (e) {
        next({message: 'The email address you have entered is ' +
                'already associated with another account', status: 409});
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
            throw new Error('Cannot create user.');
        }

        const { token }: ITokenModel = await Token.create({
            user: user._id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const emailSubject = 'JSgram - Create User';
        const emailBody = renderTemplate('create.user.pug', { user, token });

        const successSend = await sendEmail(user, emailSubject, emailBody);
        if (!successSend) {
            throw new Error('Email wasn\'t sent.');
        }

        res.json({ status: `A verification email has been sent to ${user.email}.` });
    } catch (e) {
        next({ message: 'Cannot create user.', status: 500 });
    }
};
