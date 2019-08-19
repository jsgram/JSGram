import {confirm} from '../confirm.token.controller';

import * as tr from '../../../db.requests/token.requests';
import * as ur from '../../../db.requests/user.requests';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import {Token, ITokenModel} from '../../../models/token.model';
import {User, IUserModel} from '../../../models/user.model';

const fakeNext = jest.fn(() => { /* */ });

describe('Confirm token controller:', () => {
    test('token confirmation - success', async () => {
        mockingoose(Token).toReturn({token: 'sometoken'}, 'findOne');
        const fakeToken = await Token.findOne({});

        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser = await User.findOne({});

        const mockIsTokenExist = jest.spyOn(tr, 'isTokenExist');
        mockIsTokenExist.mockReturnValue(new Promise((res: any): Promise<ITokenModel> => res(fakeToken))); // FIXME any

        const mockVerificateUser = jest.spyOn(ur, 'verificateUser');
        mockVerificateUser.mockReturnValue(new Promise((res: any): Promise<IUserModel> => res(fakeUser))); // FIXME any

        const mockDeleteToken = jest.spyOn(tr, 'deleteToken');
        mockDeleteToken.mockReturnValue(new Promise((res: any): Promise<ITokenModel> => res(fakeToken))); // FIXME any

        request.params = {
            token: fakeToken,
        };
        response.redirect = jest.fn(() => { /* */ });

        await confirm(request, response, fakeNext);
        expect(response.redirect).toHaveBeenCalledTimes(1);
    });

    test('token confirmation - failure', async () => {
        const mockIsTokenExist = jest.spyOn(tr, 'isTokenExist');
        mockIsTokenExist.mockReturnValue(new Promise((res: any): Promise<null> => res(null))); // FIXME any

        const answer = {
            message: 'User has not been authenticated',
            status: 409,
        };

        await confirm(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
