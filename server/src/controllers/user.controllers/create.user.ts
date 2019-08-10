import {NextFunction, Request, Response} from 'express';
import {IUserModel, User} from '../../models/user.model';
import {sendEmail} from '../../helpers/send.email';
import {createUserMessage} from '../../helpers/send.email.message';
import {hashPassword} from '../../helpers/hash.password';

const createUser = async (user: IUserModel, next: NextFunction): Promise<IUserModel | void> => {
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

        if (!email || !fullName || !username || !password) {
            throw new Error('Some field is empty');
        }

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
        next(e);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await createUser(req.body, next);
        if (!user) {
            throw new Error('User wasn\'t created');
        }

        await sendEmail(user, createUserMessage, next);

        res.json(
            {status: `A verification email has been sent to ${user.email}`});
    } catch (e) {
        next(e);
    }
};
