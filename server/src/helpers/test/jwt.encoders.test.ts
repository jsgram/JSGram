import {encodeJWT, decodeJWT} from '../jwt.encoders';
import jsonwebtoken from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('JWT token generation and validation:', () => {
    test('token generates successfully from username and secret', () => {
        const mockSign: jest.SpyInstance = jest.spyOn(jsonwebtoken, 'sign');
        mockSign.mockReturnValueOnce('fakejsonwebtoken');
        expect(encodeJWT('username', 'secret')).toBe('fakejsonwebtoken');
    });

    test('username decodes successfully from token and secret', () => {
        const mockVerify: jest.SpyInstance = jest.spyOn(jsonwebtoken, 'verify');
        mockVerify.mockReturnValueOnce('username');
        expect(decodeJWT('fakejsonwebtoken', 'secret')).toBe('username');
    });
});
