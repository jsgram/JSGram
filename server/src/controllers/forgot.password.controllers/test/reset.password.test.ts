import {resetPassword} from '../reset.password';

import {request, response} from 'express';
import mockingoose from 'mockingoose';
import {Token, ITokenModel, Token as t} from '../../../models/token.model';

const fakeNext = jest.fn(() => { /* */ });

describe('Reset password controller:', () => {
    beforeAll(() => {
        request.params = {
            token: 'sometoken',
        };
    });

    test('reset password - success', async () => {
        mockingoose(Token).toReturn({}, 'findOne');
        const fakeToken = Token.findOne({});

        const mockTokenFindOne = jest.spyOn(t, 'findOne');
        mockTokenFindOne.mockReturnValue(fakeToken);

        response.redirect = jest.fn(() => { /* */ });

        await resetPassword(request, response, fakeNext);
        expect(response.redirect).toHaveBeenCalledTimes(1);
    });

    test('reset password - failure', async () => {
        mockingoose(Token).toReturn(null, 'findOne');
        const fakeToken = Token.findOne({});

        const mockTokenFindOne = jest.spyOn(t, 'findOne');
        mockTokenFindOne.mockReturnValue(fakeToken);

        await resetPassword(request, response, fakeNext);
        expect(fakeNext).toHaveBeenCalledTimes(2);
    });
});
