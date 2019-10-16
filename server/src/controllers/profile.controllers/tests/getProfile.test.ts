import { getProfile } from '../getProfile';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as profileRequests from '../../../db.requests/user.requests';
import { User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get profile controller:', () => {
    test('get profile - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUserProfile: IUserModel = await User.findOne({}) as IUserModel;

        const mockGetProfile = jest.spyOn(profileRequests, 'getUserByUsername');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeUserProfile));
        mockGetProfile.mockReturnValue(answer);

        request.params = {
            userName: 'some username',
        };

        response.json = jest.fn(() => response);

        await getProfile(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
