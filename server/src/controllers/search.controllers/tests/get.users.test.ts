import { getUsers } from '../get.users';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as searchRequests from '../../../db.requests/search.request';
import { User, IUserModel } from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get user controller:', () => {
    test('get user - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser: IUserModel = await User.findOne({}) as IUserModel;

        const mockUser = jest.spyOn(searchRequests, 'findUsers');
        const value1 = new Promise((res: IResolve<IUserModel>): void => res(fakeUser));
        mockUser.mockReturnValue(value1);

        request.params = {
            query: 'some query',
            page: 1,
        };
        response.json = jest.fn(() => response);

        await getUsers(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
