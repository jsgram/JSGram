import { Request, Response, NextFunction } from 'express';

import { editUserSettings } from '../../db.requests/user.requests';
import { User, IUserSubscriptions, IUserPrivacy, IUserModel } from '../../models/user.model';
import { isValidSettings } from '../../helpers/validation';

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
            throw new Error(`User ${username} does not exist.`);
        }

        if (!isValidSettings(subscriptions) || !isValidSettings(privacy)) {
            throw new Error('Settings input is invalid.');
        }

        const updatedUser: IUserModel | null = await editUserSettings(username, req.body);

        if (!updatedUser) {
            throw new Error(`Cannot update settings of user ${username}.`);
        }

        const data: IUserSettings = {
            subscriptions: updatedUser.subscriptions as IUserSubscriptions,
            privacy: updatedUser.privacy as IUserPrivacy,
        };
        res.json({ data, message: 'Settings updated successfully.', status: 200 });
    } catch (e) {
        if (e.message) {
            next({ message: e.message, status: 409 });
        } else {
            next({ message: 'Generic error while updating settings.', status: 500 });
        }
    }
};
