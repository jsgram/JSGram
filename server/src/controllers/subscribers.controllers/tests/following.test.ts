import { getFollowing } from '../following';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as subscribeRequests from '../../../db.requests/subscribers.requests';
import { User, IUserModel } from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Following controller:', () => {
    test('following - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeFollowing: IUserModel = await User.findOne({}) as IUserModel;

        const mockFollower = jest.spyOn(subscribeRequests, 'findUser');
        const input = new Promise((res: IResolve<IUserModel>): void => res(fakeFollowing));
        mockFollower.mockReturnValue(input);

        const mockFindSubsc = jest.spyOn(subscribeRequests, 'findSubscribers');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeFollowing));
        mockFindSubsc.mockReturnValue(answer);

        request.params = {
            username: 'some name',
            page: 1,
        };
        response.json = jest.fn(() => response);

        await getFollowing(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('following - failure', async () => {
        const mockFindSubsc = jest.spyOn(subscribeRequests, 'findSubscribers');
        mockFindSubsc.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
        request.params = {
            username: '',
            page: 1,
        };

        const answer = {
            message: 'Can not show users\' following',
            status: 500,
        };

        await getFollowing(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
