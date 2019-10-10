import {checkEmail} from '../check.email';

import * as userRequests from '../../../db.requests/user.requests';
import * as sendEmail from '../../../helpers/send.email';
import * as renderTemplate from '../../../helpers/render.template';
import {User, IUserModel} from '../../../models/user.model';

import {request, response} from 'express';
import mockingoose from 'mockingoose';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */ });

describe('Check email controller:', () => {
    test('check email - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser: IUserModel = await User.findOne({}) as IUserModel;

        const mockUserExist = jest.spyOn(userRequests, 'userExist');
        mockUserExist.mockReturnValue(new Promise((res: IResolve<IUserModel>): void => res(fakeUser)));

        const mockSendEmail = jest.spyOn(sendEmail, 'sendEmail');
        mockSendEmail.mockReturnValue(new Promise((res: IResolve<number>): void => res(1)));

        const mockRenderTemplate = jest.spyOn(renderTemplate, 'renderTemplate');
        mockRenderTemplate.mockReturnValue('');

        request.body = {
            _id: '5d8df9b83726d40c562aea0d',
            email: 'some@ema.il',
            username: 'someusername',
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
            message: 'The email address you have entered isn\'t associated with JSgram account.',
            status: 409,
        };

        await checkEmail(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
