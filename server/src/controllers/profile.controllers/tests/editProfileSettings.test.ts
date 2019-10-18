import { editProfileSettings } from '../editProfileSettings';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as editRequests from '../../../db.requests/user.requests';
import { User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Edit profile settings controller:', () => {
    test('edit profile settings - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUserSetting: IUserModel = await User.findOne({}) as IUserModel;

        const mockEditUserSettings = jest.spyOn(editRequests, 'editUserSettings');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeUserSetting));
        mockEditUserSettings.mockReturnValue(answer);

        request.body = {
            subscriptions: true,
            privacy: true,
        };

        request.params = {
            username: 'some username',
        };

        response.json = jest.fn(() => response);

        await editProfileSettings(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('edit profile settings - failure', async () => {
        const mockEditUserSettings = jest.spyOn(editRequests, 'editUserSettings');
        mockEditUserSettings.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
        request.body = {
            subscriptions: true,
            privacy: true,
        };

        request.params = {
            username: '',
        };

        const answer = {
            message: 'Generic error while updating settings.',
            status: 500,
        };

        await editProfileSettings(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
