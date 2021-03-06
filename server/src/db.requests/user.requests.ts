import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';
import { hashPassword } from '../helpers/hash.password';
import { IUserSettings } from '../controllers/profile.controllers/editProfileSettings';
import { IUserPassword } from '../controllers/profile.controllers/editPassword';

interface INewUser {
    username: string;
    fullName: string;
    description: string;
}

export const userExist = async (email: string, next: NextFunction): Promise<IUserModel | void | null> => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('The email address you have entered isn\'t ' +
                'associated with another account');
        }

        return user;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};

export const verificateUser = async (userId: IUserModel, next: NextFunction): Promise<IUserModel | void | null> => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: userId},
            {isVerified: true},
            {new: true},
        );
        if (!updatedUser) {
            throw new Error('Account does not exist');
        }

        return updatedUser;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};

export const changePassword =
    async (userId: IUserModel, password: string, next: NextFunction): Promise<IUserModel | void | null> => {
        try {
            const updatedUser = await User.findOneAndUpdate(
                {_id: userId},
                {password: hashPassword(password)},
                {new: true},
            );
            if (!updatedUser) {
                throw new Error('Password did not update');
            }

            return updatedUser;
        } catch (e) {
            next({ status: 500, message: 'Password did not update' });
        }
    };

export const checkUserByProp = async (prop: string, done: any): Promise<IUserModel| any> => {
    try {
        const user = await User.findOne({email: prop});
        return user;
    } catch (e) {
        done(null, false);
    }
};

export const editUser = async (
    userEmail: string,
    newUser: any,
    next: NextFunction,
): Promise<IUserModel | void | null> => {
    try {
        const { username, fullName, description }: INewUser = newUser;
        const userWithSameUsername = await User.findOne({username});
        if (userWithSameUsername && userWithSameUsername.email !== userEmail) {
            throw new Error('There is a user with the same username');
        }
        const updatedUser = await User.findOneAndUpdate(
            {email: userEmail},
            {username, fullName, bio: description},
            {new: true},
        );
        if (!updatedUser) {
            throw new Error('Account does not exist');
        }

        return updatedUser;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};

export const editUserPassword = async (username: string, password: string): Promise<IUserModel | null> => {
    try {
        return await User.findOneAndUpdate(
            { username },
            { password: hashPassword(password) },
        );
    } catch (e) {
        throw new Error(`Database error while updating user password.`);
    }
};

export const editUserSettings = async (username: string, settings: IUserSettings): Promise<IUserModel | null> => {
    try {
        const { subscriptions, privacy }: IUserSettings = settings;

        return await User.findOneAndUpdate(
            { username },
            { subscriptions, privacy },
            { new: true },
        );
    } catch (e) {
        throw new Error(`Database error while updating user settings.`);
    }
};

export const getUserByUsername = async (username: string, next: NextFunction): Promise<IUserModel | void | null> => {
    try {
        const user = await User.findOne({username});
        if (!user) {
            throw new Error('User does not exist');
        }

        return user;
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};
