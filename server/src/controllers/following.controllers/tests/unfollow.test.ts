import { unfollow } from '../unfollow';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as unfollowRequests from '../../../db.requests/unfollow.requsets';
import { User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Unfollow controller:', () => {
    test('Unfollow - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUnfollow: IUserModel = await User.findOne({}) as IUserModel;

        const mockRemoveLoggedId = jest.spyOn(unfollowRequests, 'unfollowByUserId');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeUnfollow));
        mockRemoveLoggedId.mockReturnValue(answer);

        request.body = {
            id: 'some id',
        };

        response.locals = {
            user: {
                _id: 'some id',
            },
        };
        response.json = jest.fn(() => response);

        await unfollow(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('unfollow render - failure', async () => {
        request.body = {
            id: '',
        };

        response.locals = {
            user: {
                _id: '',
            },
        };

        const answer = {
            message: 'Cannot destructure property `id` of \'undefined\' or \'null\'.',
            status: 409,
        };

        await unfollow(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
