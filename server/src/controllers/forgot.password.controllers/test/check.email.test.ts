import {checkEmail} from '../check.email';

import * as ur from '../../../db.requests/user.requests';
import * as se from '../../../helpers/send.email';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import {User, IUserModel} from '../../../models/user.model';

const fakeNext = jest.fn(() => { /* */ });

describe('Check email controller:', () => {
    test('check email - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser = await User.findOne({});

        const mockUserExist = jest.spyOn(ur, 'userExist');
        mockUserExist.mockReturnValue(new Promise((res: any): Promise<IUserModel> => res(fakeUser)));

        const mockSendEmail = jest.spyOn(se, 'sendEmail');
        mockSendEmail.mockReturnValue(new Promise((res: any): Promise<undefined> => res(undefined)));

        request.body = {
            email: 'some@ema.il',
        };
        response.json = jest.fn(() => response);

        await checkEmail(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('check email - failure', async () => {
        request.body = {
            email: '',
        };

        const answer = {
            message: 'The email address you have entered isn\'t associated with another account',
            status: 409,
        };

        await checkEmail(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
