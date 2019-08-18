import {sendEmail} from '../send.email';

import {User, IUserModel} from '../../models/user.model';
import mockingoose from 'mockingoose';

const fakeNext = jest.fn(() => { /* */ });

describe('Email sender controller:', () => {
    test.skip('send email - failure', async () => {
        mockingoose(User).toReturn({email: 'a@a.a'}, 'findOne');
        const fakeUser = await User.findOne({});
        const mockMessage = jest.fn((u1: string, u2: string): void => { /* */ });

        // TODO mock Token and nodemailer
        const ans = await sendEmail(fakeUser as IUserModel, mockMessage, fakeNext);
        expect(ans).toBe(undefined);
    });
});
