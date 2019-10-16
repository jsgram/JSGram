import { follow } from '../follow';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as followRequests from '../../../db.requests/follow.requsets';
import { User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Follow controller:', () => {
    test('follow - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeFollow: IUserModel = await User.findOne({}) as IUserModel;

        const mockCheckFollow = jest.spyOn(followRequests, 'checkFollowing');
        const input = new Promise((res: IResolve<IUserModel>): void => res(fakeFollow));
        mockCheckFollow.mockReturnValue(input);

        const mockFollowById = jest.spyOn(followRequests, 'followByUserId');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeFollow));
        mockFollowById.mockReturnValue(answer);

        request.body = {
            _id: 'some id',
        };

        response.locals = {
            user: {
                _id: 'some id',
            },
        };
        response.json = jest.fn(() => response);

        await follow(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('follow render - failure', async () => {
        request.body = {
            _id: '',
        };

        response.locals = {
            user: {
                _id: '',
            },
        };

        const answer = {
            message: 'You have already followed this user',
            status: 500,
        };

        await follow(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
