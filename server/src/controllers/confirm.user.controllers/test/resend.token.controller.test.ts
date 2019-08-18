import {resend} from '../resend.token.controller';

import * as ur from '../../../db.requests/user.requests';
import * as se from '../../../helpers/send.email';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import {User, IUserModel} from '../../../models/user.model';

const fakeNext = jest.fn(() => { /* */ });

describe('Resend token controller:', () => {
    test('token resend - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser = await User.findOne({});

        const mockUserExist = jest.spyOn(ur, 'userExist');
        mockUserExist.mockReturnValue(new Promise((res: any): Promise<IUserModel> => res(fakeUser))); // FIXME any

        const mockSendEmail = jest.spyOn(se, 'sendEmail');
        mockSendEmail.mockReturnValue(new Promise((res: any): Promise<undefined> => res(undefined))); // FIXME any

        request.body = {
            email: 'some@ema.il',
        };
        response.json = jest.fn(() => response);

        await resend(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('token resend - failure', async () => {
        request.body = {
            email: '',
        };

        const ans = {
            message: 'Verification E-mail does not send to user',
            status: 409,
        };

        await resend(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(ans);
    });
});
