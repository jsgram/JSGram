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
            const message = 'Unauthorized attempt to edit profile';

            console.warn(new Error(message));
            next({ message, status: 403 });
        }
        if (!isValidPassword(oldPassword) ||
            !isValidPassword(newPassword) || oldPassword === newPassword) {
            const message = 'Password input is invalid.';

            console.warn(new Error(message));
            next({ message, status: 426 });
        }

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            const message = `User ${username} does not exist.`;

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const oldPasswordMatch = await isCorrectPassword(oldPassword, (existingUser as IUserModel).password);

        if (!oldPasswordMatch) {
            const message = 'Password input is invalid.';

            console.warn(new Error(message));
            next({ message, status: 426 });
        }

        const updatedUser = await editUserPassword(username, newPassword);

        if (!updatedUser) {
            const message = `Cannot update password of user ${username}.`;

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({ message: 'Password updated successfully.', status: 200 });
    } catch (e) {
        console.error(e);
        next({ message: 'Generic error while updating password.', status: 500 });
    }
};
