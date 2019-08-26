import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';
import { hashPassword } from '../helpers/hash.password';

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
        next({message: 'The email address you have entered isn\'t ' +
                'associated with another account', status: 409});
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
        next({message: 'User does not exist', status: 409});
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
            next({message: 'Password did not update', status: 409});
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
        next({message: 'Username is not unique', status: 409});
    }
};
