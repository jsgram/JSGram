import {encodeJWT, decodeJWT} from '../jwt.encoders';
import jwt from 'jsonwebtoken';

describe('JWT token manipulation helper:', () => {
    test('generate token - success', () => {
        jwt.sign = jest.fn(() => 'fakejsonwebtoken');
        expect(encodeJWT('username', 'secret')).toBe('fakejsonwebtoken');
    });

    test('validate token - success', () => {
        jwt.verify = jest.fn(() => 'username');
        expect(decodeJWT('fakejsonwebtoken', 'secret')).toBe('username');
    });
});
