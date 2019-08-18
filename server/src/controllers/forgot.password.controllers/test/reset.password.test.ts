import {resetPassword} from '../reset.password';
import {request, response} from 'express';

const fakeNext = jest.fn(() => { /* */ });

describe('Reset password controller:', () => {
    beforeAll(() => {
        request.params = {
            token: 'sometoken',
        };
    });

    test.skip('reset password - success', async () => {
        // TODO fix DB connection issue
        // TODO mock Token.findOne
        const answer = await resetPassword(request, response, fakeNext);
        expect(answer).toBe(undefined);
    });

    test.skip('reset password - failure', async () => {
        // TODO fix DB connection issue
        // TODO mock Token.findOne
        const answer = await resetPassword(request, response, fakeNext);
        expect(answer).toBe(undefined);
    });
});
