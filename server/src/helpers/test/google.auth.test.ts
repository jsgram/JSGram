import {IGoogleUser, getUsername, generatePassword, createSocialUser} from '../social.auth';

describe('Google auth helpers:', () => {
    test('get username from email - success', () => {
        expect(getUsername('cat@mouse.me')).toBe('cat');
    });

    test('generate random password - success', () => {
        expect(generatePassword()).toHaveLength(8);
    });

    test.skip('create Google user - success', () => {
        // TODO fake User constructor
        expect(createSocialUser('good@ema.il', 'name').username).toBe('good');
    });
});
