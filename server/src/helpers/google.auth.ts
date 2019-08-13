import {User} from '../models/user.model';
import {hashPassword} from './hash.password';
import {Document} from 'mongoose';

const RADIX = 36;
const PASSWORD_LENGTH_FROM_END = -8;

export interface IGoogleUser extends Document {
    email: string;
    fullName: string;
    username: string;
    password: string;
    isVerified: boolean;
}

export const getUsername = (email: string): string => {
    return email.substr(0, email.indexOf('@'));
};

export const generatePassword = (): string => {
    return Math.random().toString(RADIX).slice(PASSWORD_LENGTH_FROM_END);
};

export const createGoogleUser = (email: string, name: string): IGoogleUser => {
    const newUser = new User();
    newUser.email = email;
    newUser.fullName = name;
    newUser.username = getUsername(email);
    newUser.password = hashPassword(generatePassword());
    newUser.isVerified = true;
    newUser.save();

    return newUser;
};
