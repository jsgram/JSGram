import {hashPassword} from '../hash.password';
import bcrypt from 'bcrypt';

describe('Bcrypt hash generation helper:', () => {
    test('generate hash - success', () => {
        bcrypt.genSaltSync = jest.fn(() => 'salt');
        bcrypt.hashSync = jest.fn(() => 'hash');

        expect(hashPassword('password')).toBe('hash');
    });
});
