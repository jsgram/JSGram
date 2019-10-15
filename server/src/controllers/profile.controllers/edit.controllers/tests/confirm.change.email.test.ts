import { confirmChangeEmail } from '../confirm.change.email';
import { request, response } from 'express';

const fakeNext = jest.fn(() => { /* */});

describe('Confirm change email controller:', () => {
    test('confirm change email - success', async () => {
        request.params = {
            oldEmail: 'some old email',
            email: 'some email',
            token: 'some token',
        };

        response.json = jest.fn(() => response);

        await confirmChangeEmail(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('confirm change email - failure', async () => {
        request.params = {
            oldEmail: '',
            email: '',
            token: '',
        };

        const answer = {
            message: 'User has not been authenticated',
            status: 409,
        };

        await confirmChangeEmail(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
