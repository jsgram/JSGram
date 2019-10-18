import { editPassword } from '../editPassword';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as editRequests from '../../../db.requests/user.requests';
import { User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Edit password controller:', () => {
    test('edit password - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakePassword: IUserModel = await User.findOne({}) as IUserModel;

        const mockEditPassword = jest.spyOn(editRequests, 'editUserPassword');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakePassword));
        mockEditPassword.mockReturnValue(answer);

        request.body = {
            oldPassword: 'some old password',
            newsPassword: 'some news password',
        };

        request.params = {
            username: 'some username',
        };

        response.locals = {
            user: {
                username: 'some username',
            },
        };
        response.json = jest.fn(() => response);

        await editPassword(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('edit password - failure', async () => {
        request.body = {
            oldPassword: '',
            newsPassword: '',
        };

        request.params = {
            username: '',
        };

        response.locals = {
            user: {
                username: '',
            },
        };

        const answer = {
            message: 'Generic error while updating password.',
            status: 500,
        };

        await editPassword(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
