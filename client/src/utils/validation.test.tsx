import validate from './validation';

describe('Validation function:', () => {
    test('validate - success', () => {
        const input = {
            username: 'correctusername',
            email: 'correct@ema.il',
            fullName: 'correctfullName',
            password: 'correctpassword',
        };
        const output = {};

        expect(validate(input)).toStrictEqual(output);
    });

    test('validate - failure', () => {
        const input = {
            username: '',
            email: '',
            fullName: '',
            password: '',
        };
        const output = {
            email: 'Please, enter your email!',
            fullName: 'Please, enter your fullname!',
            password: 'Please, enter your password!',
            username: 'Please, enter your username!',
        };

        expect(validate(input)).toStrictEqual(output);
    });
});
