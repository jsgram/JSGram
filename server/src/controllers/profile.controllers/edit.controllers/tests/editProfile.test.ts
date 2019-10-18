import { editProfile } from '../editProfile';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as editRequests from '../../../../db.requests/user.requests';
import { User, IUserModel} from '../../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Edit profile controller:', () => {
    test('edit profile - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeEditProfile: IUserModel = await User.findOne({}) as IUserModel;

        const mockEditUser = jest.spyOn(editRequests, 'editUser');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeEditProfile));
        mockEditUser.mockReturnValue(answer);

        request.body = {
            user: 'some user',
        };

        response.locals = {
            user: {
                id: 'some id',
            },
        };

        response.json = jest.fn(() => response);

        await editProfile(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('edit profile - failure', async () => {
        request.body = {
            user: '',
        };

        response.locals = {
            user: {
                id: '',
            },
        };

        const answer = {
            message: 'Unauthorized attempt to edit profile',
            status: 403,
        };

        await editProfile(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
