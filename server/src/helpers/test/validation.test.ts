import validateInput from '../validation';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import {User, IUserModel} from '../../models/user.model';
import mockingoose from 'mockingoose';

describe('Validate registration form helper:', () => {
    test('validate input - failure (no fields provided)', async () => {
        Validator.isEmpty = jest.fn(() => true);
        Validator.isEmail = jest.fn(() => true);
        Validator.isLength = jest.fn(() => true);
        jest.mock('lodash/isEmpty', () => false);

        const inp = {};
        const out = {
            errors: {
                email: 'Email is required',
                fullName: 'Fullname is required',
                username: 'Username is required',
                password: 'Password is required',
            },
            isValid: false,
        };

        mockingoose(User).toReturn(inp, 'findOne');
        const fakeUser = await User.findOne({});

        expect(validateInput(fakeUser as IUserModel)).toStrictEqual(out);
    });

    test('validate input - failure (invalid email and password fields provided)', async () => {
        Validator.isEmpty = jest.fn(() => false);
        Validator.isEmail = jest.fn(() => false);
        Validator.isLength = jest.fn(() => false);
        jest.mock('lodash/isEmpty', () => false);

        const inp = {
            email: 'in@valid',
            fillName: 'valid',
            username: 'valid',
            password: 'invalid',
        };
        const out = {
            errors: {
                email: 'Email is invalid',
                password: 'Password field must be at least 8 character long',
            },
            isValid: false,
        };

        mockingoose(User).toReturn(inp, 'findOne');
        const fakeUser = await User.findOne({});

        expect(validateInput(fakeUser as IUserModel)).toStrictEqual(out);
    });

    test('validate input - success', async () => {
        Validator.isEmpty = jest.fn(() => false);
        Validator.isEmail = jest.fn(() => true);
        Validator.isLength = jest.fn(() => true);
        jest.mock('lodash/isEmpty', () => true);

        const inp = {
            email: 'valid@ema.il',
            fillName: 'valid',
            username: 'valid',
            password: 'longandvalid',
        };
        const out = {
            errors: {},
            isValid: true,
        };

        mockingoose(User).toReturn(inp, 'findOne');
        const fakeUser = await User.findOne({});

        expect(validateInput(fakeUser as IUserModel)).toStrictEqual(out);
    });
});
