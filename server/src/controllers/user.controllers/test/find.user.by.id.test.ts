import {findById} from '../find.user.by.id';
import { request, response } from 'express';

const fakeNext = jest.fn(() => { /* */});

describe('Find user by id controller:', () => {
    test('user found successfully', async () => {
        request.params = {
            id: 'some id',
        };
        response.json = jest.fn(() => response);

        await findById(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });
});
