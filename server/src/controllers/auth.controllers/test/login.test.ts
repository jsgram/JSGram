import {login} from '../login';

import * as ue from '../../../db.requests/user.requests';
import {request, response} from 'express';
import passport from 'passport';
import mockingoose from 'mockingoose';
import {User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */ });

describe('User login controller:', () => {
    beforeAll(() => {
        request.body = {
            email: 'some@ema.il',
        };
    });

    test('user does not exist - failure', async () => {
        const mockUserExist = jest.spyOn(ue, 'userExist');
        mockUserExist.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));

        const output = {
            message: 'User does not exist',
            status: 406,
        };
        await login(request, response, fakeNext);

        expect(fakeNext).toHaveBeenLastCalledWith(output);
    });

    test('generic authentication error - failure', async () => {
        mockingoose(User).toReturn({isVerified: true}, 'findOne');
        const fakeUser: IUserModel = await User.findOne({}) as IUserModel;

        const mockUserExist = jest.spyOn(ue, 'userExist');
        mockUserExist.mockReturnValue(new Promise((res: IResolve<IUserModel>): void => res(fakeUser)));
        passport.authenticate = jest.fn(() => { /* */ });

        await login(request, response, fakeNext);

        expect(passport.authenticate).toHaveBeenCalledTimes(1);
    });
});
