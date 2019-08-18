import {updatePassword} from '../update.password';

import * as tr from '../../../db.requests/token.requests';
import * as ur from '../../../db.requests/user.requests';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import {Token, ITokenModel} from '../../../models/token.model';
import {User, IUserModel} from '../../../models/user.model';

const fakeNext = jest.fn(() => { /* */ });

describe('Update password controller:', () => {
    test('update password - success', async () => {
        mockingoose(Token).toReturn({token: 'sometoken'}, 'findOne');
        const fakeToken = await Token.findOne({});

        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser = await User.findOne({});

        const mockIsTokenExist = jest.spyOn(tr, 'isTokenExist');
        mockIsTokenExist.mockReturnValue(new Promise((res: any): Promise<ITokenModel> => res(fakeToken))); // FIXME any

        const mockChangePassword = jest.spyOn(ur, 'changePassword');
        mockChangePassword.mockReturnValue(new Promise((res: any): Promise<IUserModel> => res(fakeUser))); // FIXME any

        const mockDeleteToken = jest.spyOn(tr, 'deleteToken');
        mockDeleteToken.mockReturnValue(new Promise((res: any): Promise<ITokenModel> => res(fakeToken))); // FIXME any

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
        const mockIsTokenExist = jest.spyOn(tr, 'isTokenExist');
        mockIsTokenExist.mockReturnValue(new Promise((res: any): Promise<null> => res(null))); // FIXME any

        request.params = {
            token: '',
        };
        request.body = {
            password: '',
        };

        const ans = {
            message: 'Password has not been update',
            status: 409,
        };

        await updatePassword(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(ans);
    });
});
