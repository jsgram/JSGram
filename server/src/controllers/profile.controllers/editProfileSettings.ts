import { editUserSettings } from '../../db.requests/user.requests';
import { User, IUserSubscriptions, IUserPrivacy, IUserModel } from '../../models/user.model';
import { isValidSettings } from '../../helpers/validation';
import { notificationEmitter } from '../../worker';

import { Request, Response, NextFunction } from 'express';

export interface IUserSettings {
    subscriptions: IUserSubscriptions;
    privacy: IUserPrivacy;
}

export const editProfileSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username }: { username: string } = req.params;
        const { subscriptions, privacy }: IUserSettings = req.body;
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            const message = `User ${username} does not exist.`;

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        if (!isValidSettings(subscriptions) || !isValidSettings(privacy)) {
            const message = 'Settings input is invalid.';

            console.warn(new Error(message));
            next({ message, status: 422 });
        }

        const updatedUser: IUserModel | null = await editUserSettings(username, req.body);

        if (!updatedUser) {
            const message = `Cannot update settings of user ${username}.`;

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const { subscriptions: { isReminderEmail } }: any = updatedUser;
        const changedReminder = isReminderEmail === subscriptions.isReminderEmail;

        if (changedReminder) {
            const action = isReminderEmail ? 'enqueue' : 'dequeue';
            notificationEmitter.emit(action, updatedUser);
        }

        const data: IUserSettings = {
            subscriptions: (updatedUser as IUserModel).subscriptions as IUserSubscriptions,
            privacy: (updatedUser as IUserModel).privacy as IUserPrivacy,
        };

        res.json({ data, message: 'Settings updated successfully.', status: 200 });
    } catch (e) {
        console.error(e);
        next({ message: 'Generic error while updating settings.', status: 500 });
    }
};
