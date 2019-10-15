import { getUser } from '../get.user';
import { request, response } from 'express';

const fakeNext = jest.fn(() => { /* */});

describe('Get user controller:', () => {
    test('get user - success', async () => {
        response.json = jest.fn(() => response);

        await getUser(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });
    test.skip('get user - failure', async () => {
        const answer = {
            message: 'Cannot destructure property `user` of \'undefined\' or \'null\'.',
            status: 400,
        };

        await getUser(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
