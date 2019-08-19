import {login} from '../login';

import * as ue from '../../../db.requests/user.requests';
import {request, response} from 'express';
import passport from 'passport';
import mockingoose from 'mockingoose';
import {User, IUserModel} from '../../../models/user.model';

const fakeNext = jest.fn(() => { /* */ });

describe('User login controller:', () => {
    beforeAll(() => {
        request.body = {
            email: 'some@ema.il',
        };
    });

    test('login - failure', async () => {
        const mockUserExist = jest.spyOn(ue, 'userExist');
        mockUserExist.mockReturnValue(new Promise((res: any): Promise<null> => res(null))); // FIXME any

        const output = {
            message: 'You entered invalid email or password',
            status: 406,
        };
        await login(request, response, fakeNext);

        expect(fakeNext).toHaveBeenLastCalledWith(output);
    });

    test('generic authentication error happened', async () => {
        mockingoose(User).toReturn({isVerified: true}, 'findOne');
        const fakeUser = await User.findOne({});

        const mockUserExist = jest.spyOn(ue, 'userExist');
        mockUserExist.mockReturnValue(new Promise((res: any): Promise<null> => res(fakeUser))); // FIXME any
        passport.authenticate = jest.fn(() => { /* */ });

        await login(request, response, fakeNext);

        expect(passport.authenticate).toHaveBeenCalledTimes(1);
    });
});
