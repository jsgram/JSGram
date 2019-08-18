import {IError, errorHandler} from '../error.handler';
import {request, response} from 'express';

describe('Error handler middleware:', () => {
    test('426 status retured - success', () => {
        const err: IError = {
            status: 426,
            message: 'error 426',
        };
        const fakeResponse = Object.assign(response, {
            status: jest.fn(() => response),
            json: jest.fn(() => response),
        });

        errorHandler(err, request, fakeResponse, () => { /* */ });

        expect(fakeResponse.status).toHaveBeenLastCalledWith(426);
        expect(fakeResponse.json).toHaveBeenCalledTimes(1);
    });
});
