import { getSubscribers } from '../get.subscribers';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as subscribeRequests from '../../../db.requests/subscribers.requests';
import { User, IUserModel } from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get subscribers controller:', () => {
    test('get subscribers - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeSubscribers: IUserModel = await User.findOne({}) as IUserModel;

        const mockSubscriber = jest.spyOn(subscribeRequests, 'findUser');
        const input = new Promise((res: IResolve<IUserModel>): void => res(fakeSubscribers));
        mockSubscriber.mockReturnValue(input);

        const mockFindSubscriber = jest.spyOn(subscribeRequests, 'findSubscribers');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeSubscribers));
        mockFindSubscriber.mockReturnValue(answer);

        response.json = jest.fn(() => response);

        await getSubscribers('some name', 'subscriber', 1, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('following - failure', async () => {
        const mockFindSubsc = jest.spyOn(subscribeRequests, 'findSubscribers');
        mockFindSubsc.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));

        const answer = {
            message: 'Can not show users\' followers',
            status: 500,
        };

        await getSubscribers('some name', 'subscriber', 1, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
