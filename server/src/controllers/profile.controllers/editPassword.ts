import { Request, Response, NextFunction } from 'express';

import { editUserPassword } from '../../db.requests/user.requests';
import { User, IUserModel } from '../../models/user.model';
import { isValidPassword } from '../../helpers/validation';
import { isCorrectPassword } from '../../helpers/hash.password';

export interface IUserPassword {
    oldPassword: string;
    newPassword: string;
}

export const editPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const username = req.params.username;
        const { oldPassword, newPassword }: IUserPassword = req.body;
        const { locals: { user: { username: loggedUser } } }: Response = res;
        if (loggedUser !== username) {
            throw new Error('Unauthorized attempt to edit profile');
        }
        if (!isValidPassword(oldPassword) ||
            !isValidPassword(newPassword) || oldPassword === newPassword) {
            throw new Error('Password input is invalid.');
        }

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            throw new Error(`User ${username} does not exist.`);
        }

        const oldPasswordMatch = await isCorrectPassword(oldPassword, existingUser.password);

        if (!oldPasswordMatch) {
            throw new Error('Password input is invalid.');
        }

        const updatedUser = await editUserPassword(username, newPassword);

        if (!updatedUser) {
            throw new Error(`Cannot update password of user ${username}.`);
        }

        res.json({ message: 'Password updated successfully.', status: 200 });
    } catch (e) {
        if (e.message) {
            next({ message: e.message, status: 400 });
        } else {
            next({ message: 'Generic error while updating password.', status: 500 });
        }
    }
};
