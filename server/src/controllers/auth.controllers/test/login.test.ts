/*
import login from '../login';

import express from 'express';
import passport from 'passport';
import {encodeJWT} from '../../../helpers/jwt.encoders';
import {IUserModel} from '../../../models/user.model';
import {userExist} from '../../../db.requests/user.requests';

jest.mock('validator');

describe('User login:', () => {
    test('user does not exist', () => {
        const mockSign: jest.SpyInstance = jest.spyOn(jsonwebtoken, 'sign');
        mockSign.mockReturnValueOnce('fakejsonwebtoken');
        expect(encodeJWT('username', 'secret')).toBe('fakejsonwebtoken');
    });

    test('user had not verified his email yet', () => {
    });

    test('generic authentication error happened', () => {
    });

    test('login executed successfully', () => {
    });
});
*/
