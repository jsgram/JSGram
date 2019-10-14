import { getFollowers } from '../followers';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as subscribeRequests from '../../../db.requests/subscribers.requests';
import { User, IUserModel } from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Follower controller:', () => {
    test('follower - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeFollower: IUserModel = await User.findOne({}) as IUserModel;

        const mockFollower = jest.spyOn(subscribeRequests, 'findUser');
        const value1 = new Promise((res: IResolve<IUserModel>): void => res(fakeFollower));
        mockFollower.mockReturnValue(value1);

        const mockFindSubsc = jest.spyOn(subscribeRequests, 'findSubscribers');
        const value2 = new Promise((res: IResolve<IUserModel>): void => res(fakeFollower));
        mockFindSubsc.mockReturnValue(value2);

        request.params = {
            username: 'some name',
            page: 1,
        };
        response.json = jest.fn(() => response);

        await getFollowers(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('follower - failure', async () => {
        const mockFindSubsc = jest.spyOn(subscribeRequests, 'findSubscribers');
        mockFindSubsc.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
        request.params = {
            username: '',
            page: 1,
        };

        const answer = {
            message: 'Can not show users\' followers',
            status: 409,
        };

        await getFollowers(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
