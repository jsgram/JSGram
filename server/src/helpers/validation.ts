import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {IUserModel} from '../models/user.model';

export interface IValidationError {
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
}

export default function validateInput(data: IUserModel): {errors: IValidationError, isValid: boolean} {

    const errors: IValidationError = {};

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }
    if (Validator.isEmpty(data.fullName)) {
        errors.fullName = 'Fullname is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (!Validator.isLength(data.password, 8)) {
        errors.password = 'Password field must be at least 8 character long';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

export const isValidPassword = function(password: string): boolean {
    return typeof password === 'string' && password.length >= 8 ? true : false;
};
