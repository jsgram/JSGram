import { getFriendsRecommendations } from '../getFriendsRecommendations';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as friendRequests from '../../../db.requests/getFriendsRecommendations.requests';
import { User } from '../../../models/user.model';
import { IUser } from '../../../db.requests/getFriendsRecommendations.requests';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get friend recommendations controller:', () => {
    test('get friend recommendations - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeFriend: IUser = await User.findOne({}) as IUser;
        const fakeFriends: object[] = await User.find({}) as object[];

        const mockFindUser = jest.spyOn(friendRequests, 'findUser');
        const input = new Promise((res: IResolve<IUser>): void => res(fakeFriend));
        mockFindUser.mockReturnValue(input);

        const mockFindUsers = jest.spyOn(friendRequests, 'findUsers');
        const answer = new Promise((res: IResolve<object[]>): void => res(fakeFriends));
        mockFindUsers.mockReturnValue(answer);

        response.locals = {
            user: {
                _id: 'some id',
            },
        };

        response.json = jest.fn(() => response);

        await getFriendsRecommendations(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('get friend recommendations - failure', async () => {
        const mockFindUser = jest.spyOn(friendRequests, 'findUser');
        mockFindUser.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
        response.locals = {
            user: {
                _id: '',
            },
        };

        const answer = {
            message: 'User is not found',
            status: 409,
        };

        await getFriendsRecommendations(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
