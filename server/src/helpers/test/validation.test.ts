import validateInput from '../validation';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import {User, IUserModel} from '../../models/user.model';
import mockingoose from 'mockingoose';

jest.mock('validator');

describe('Validate user registration input:', () => {
    const mockValidatorIsEmpty: jest.SpyInstance = jest.spyOn(Validator, 'isEmpty');
    const mockValidatorIsEmail: jest.SpyInstance = jest.spyOn(Validator, 'isEmail');
    const mockValidatorIsLength: jest.SpyInstance = jest.spyOn(Validator, 'isLength');

    afterEach(() => {
        mockValidatorIsEmpty.mockClear();
    });

    test('no { email, fullName, username, password } fields provided', async () => {
        mockValidatorIsEmpty.mockReturnValue(true);
        mockValidatorIsEmail.mockReturnValueOnce(true);
        mockValidatorIsLength.mockReturnValueOnce(true);
        jest.mock('lodash/isEmpty', () => false);

        const out = {
            errors: {
                email: 'Email is required',
                fullName: 'Fullname is required',
                username: 'Username is required',
                password: 'Password is required',
            },
            isValid: false,
        };
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser = await User.findOne({});

        expect(validateInput(<IUserModel>fakeUser)).toStrictEqual(out);
    });

    test('invalid { email, password } fields', async () => {
        mockValidatorIsEmpty.mockReturnValue(false);
        mockValidatorIsEmail.mockReturnValueOnce(false);
        mockValidatorIsLength.mockReturnValueOnce(false);
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

        expect(validateInput(<IUserModel>fakeUser)).toStrictEqual(out);
    });

    test('all input is valid', async () => {
        mockValidatorIsEmpty.mockReturnValue(false);
        mockValidatorIsEmail.mockReturnValueOnce(true);
        mockValidatorIsLength.mockReturnValueOnce(true);
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

        expect(validateInput(<IUserModel>fakeUser)).toStrictEqual(out);
    });
});
