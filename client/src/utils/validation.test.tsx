import validate from './validation';

describe('Validation function:', () => {
    test('validate - success', () => {
        const input = {
            description: 'correctDescription',
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
            description: 'Description should be more than 3 and less than 200.',
            email: 'Please, enter your email.',
            fullName: 'Please, enter your fullname.',
            password: 'Please, enter your password.',
            username: 'Please, enter your username.',
        };

        expect(validate(input)).toStrictEqual(output);
    });
});
