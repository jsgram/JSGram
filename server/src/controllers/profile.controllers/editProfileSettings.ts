import { Request, Response, NextFunction } from 'express';

import { editUserSettings } from '../../db.requests/user.requests';
import { User, IUserNotifications, IUserPrivacy, IUserModel } from '../../models/user.model';

export interface IUserSettings {
    username: string;
    notifications: IUserNotifications;
    privacy: IUserPrivacy;
}

export const editProfileSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: IUserSettings = req.body.user;
        const existingUser = await User.findOne({ username: user.username });

        if (!existingUser) {
            throw new Error(`User ${user.username} does not exist.`);
        }

        const updatedUser: IUserModel | null = await editUserSettings(user);

        if (!updatedUser) {
            throw new Error(`Cannot update settings of user ${user.username}.`);
        }

        const response: IUserSettings = {
            username: user.username,
            notifications: updatedUser.notifications as IUserNotifications,
            privacy: updatedUser.privacy as IUserPrivacy,
        };
        res.json({ response, status: 'Settings updated successfully.' });
    } catch (e) {
        if (e.message) {
            next({ message: e.message, status: 409 });
        } else {
            next({ message: 'Generic error while updating settings.', status: 500 });
        }
    }
};
