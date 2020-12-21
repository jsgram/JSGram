import {sendEmail} from '../send.email';

import {User, IUserModel} from '../../models/user.model';
import mockingoose from 'mockingoose';

const fakeNext = jest.fn(() => { /* */ });

describe('Email sender controller:', () => {
    test.skip('send email - failure', async () => {
        mockingoose(User).toReturn({email: 'a@a.a'}, 'findOne');
        const fakeUser = await User.findOne({});
        const mockEmailSubject = 'fakeemailsubject';
        const mockEmailBody = 'fakeemailbody';

        // TODO mock Token and nodemailer
        const answer = await sendEmail(fakeUser as IUserModel, mockEmailSubject, mockEmailBody);
        expect(answer).toBe(undefined);
    });
});
