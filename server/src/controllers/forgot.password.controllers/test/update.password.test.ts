import {updatePassword} from '../update.password';

import * as tokenRequests from '../../../db.requests/token.requests';
import * as userRequests from '../../../db.requests/user.requests';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import {Token, ITokenModel} from '../../../models/token.model';
import {User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */ });

describe('Update password controller:', () => {
    test('update password - success', async () => {
        mockingoose(Token).toReturn({token: 'sometoken'}, 'findOne');
        const fakeToken: ITokenModel = await Token.findOne({}) as ITokenModel;

        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser: IUserModel = await User.findOne({}) as IUserModel;

        const mockIsTokenExist = jest.spyOn(tokenRequests, 'isTokenExist');
        const value1 = new Promise((res: IResolve<ITokenModel>): void => res(fakeToken));
        mockIsTokenExist.mockReturnValue(value1);

        const mockChangePassword = jest.spyOn(userRequests, 'changePassword');
        const value2 = new Promise((res: IResolve<IUserModel>): void => res(fakeUser));
        mockChangePassword.mockReturnValue(value2);

        const mockDeleteToken = jest.spyOn(tokenRequests, 'deleteToken');
        const value3 = new Promise((res: IResolve<ITokenModel>): void => res(fakeToken));
        mockDeleteToken.mockReturnValue(value3);

        request.params = {
            token: 'sometoken',
        };
        request.body = {
            password: 'somepassword',
        };
        response.json = jest.fn(() => response);

        await updatePassword(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('update password - failure', async () => {
        const mockIsTokenExist = jest.spyOn(tokenRequests, 'isTokenExist');
        mockIsTokenExist.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));

        request.params = {
            token: '',
        };
        request.body = {
            password: '',
        };

        const answer = {
            message: 'Server error',
            status: 500,
        };

        await updatePassword(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
