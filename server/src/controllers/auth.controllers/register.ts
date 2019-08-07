import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import {IUserModel, User} from '../../models/user.model';

// TODO process.env global types
/*
declare const process: {
		env: {
				SALT_ROUNDS: string,
		},
};
*/

export const register = async (req: Request,
                               res: Response,
                               next: NextFunction) => {
    const {email, fullName, username, password}: IUserModel = req.body;

    // TODO validation
    if (!email || !fullName || !username || !password) {
        throw new Error('Some field is empty');
    }

    const saltRounds: number = 12;

    const salt: string = bcrypt.genSaltSync(saltRounds);
    const hash: string = bcrypt.hashSync(password, salt);

    try {
        const createdUser: IUserModel = await User.create({
            email,
            fullName,
            username,
            password: hash,
        });
        next();
    } catch (e) {
        next(e);
    }
};
