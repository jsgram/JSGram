import {createUserMessage, resendTokenMessage, forgotPasswordMessage} from '../send.email.message';

describe('Email message template helper:', () => {
    beforeAll(() => {
        process.env = Object.assign(process.env, {
            BACK_PATH: 'fakebackpath',
        });
    });

    test('create user registration message - success', () => {
        expect(createUserMessage('username', 'token')).toHaveLength(2042);
    });

    test('create resend token message - success', () => {
        expect(resendTokenMessage('username', 'token')).toHaveLength(190);
    });

    test('create forgot password message - success', () => {
        expect(forgotPasswordMessage('username', 'token')).toHaveLength(2609);
    });
});
