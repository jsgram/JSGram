import { NextFunction } from 'express';
import { IUserModel, User } from '../models/user.model';
import { hashPassword } from '../helpers/hash.password';

export const userExist = async (email: string, next: NextFunction): Promise<IUserModel | void | null> => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('User does not exist');
        }

        return user;
    } catch (e) {
        next(e);
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
            throw new Error('User does not exist');
        }

        return updatedUser;
    } catch (e) {
        next(e);
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
            next(e);
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
