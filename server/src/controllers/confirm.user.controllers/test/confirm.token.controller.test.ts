import {confirm} from '../confirm.token.controller';

import * as tokenRequests from '../../../db.requests/token.requests';
import * as userRequests from '../../../db.requests/user.requests';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import {Token, ITokenModel} from '../../../models/token.model';
import {User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */ });

describe('Confirm token controller:', () => {
    test('token confirmation - success', async () => {
        mockingoose(Token).toReturn({token: 'sometoken'}, 'findOne');
        const fakeToken: ITokenModel = await Token.findOne({}) as ITokenModel;

        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser: IUserModel = await User.findOne({}) as IUserModel;

        const mockIsTokenExist = jest.spyOn(tokenRequests, 'isTokenExist');
        const value1 = new Promise((res: IResolve<ITokenModel>): void => res(fakeToken));
        mockIsTokenExist.mockReturnValue(value1);

        const mockVerificateUser = jest.spyOn(userRequests, 'verificateUser');
        const value2 = new Promise((res: IResolve<IUserModel>): void => res(fakeUser));
        mockVerificateUser.mockReturnValue(value2);

        const mockDeleteToken = jest.spyOn(tokenRequests, 'deleteToken');
        const value3 = new Promise((res: IResolve<ITokenModel>): void => res(fakeToken));
        mockDeleteToken.mockReturnValue(value3);

        request.params = {
            token: fakeToken,
        };
        response.redirect = jest.fn(() => { /* */ });

        await confirm(request, response, fakeNext);
        expect(response.redirect).toHaveBeenCalledTimes(1);
    });

    test('token confirmation - failure', async () => {
        const mockIsTokenExist = jest.spyOn(tokenRequests, 'isTokenExist');
        mockIsTokenExist.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));

        const answer = {
            message: 'User has not been authenticated',
            status: 409,
        };

        await confirm(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
