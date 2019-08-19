import {NextFunction, Request, Response} from 'express';
import {IUserModel, User} from '../../models/user.model';
import {sendEmail} from '../../helpers/send.email';
import {createUserMessage} from '../../helpers/send.email.message';
import {hashPassword} from '../../helpers/hash.password';
import validateInput, {IValidationError} from '../../helpers/validation';

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

        return await User.create({
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
    } catch (e) {
        next({message: 'The email address you have entered is ' +
                'already associated with another account', status: 409});
    }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {errors, isValid}: { errors: IValidationError, isValid: boolean } = validateInput(req.body);
        if (!isValid) {
            res.json(errors);
            return;
        }
        const user = await createUser(req.body, next);
        if (!user) {
            throw new Error('Can not create user');
        }

        await sendEmail(user, createUserMessage, next);

        res.json(
            {status: `A verification email has been sent to ${user.email}`});
    } catch (e) {
        next({message: 'Can not create user', status: 500});
    }
};
