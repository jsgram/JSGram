import { remove } from '../remove.user.by.id';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as userRequests from '../../../db.requests/delete.user.requests';
import { User, IUserModel} from '../../../models/user.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Delete user controller:', () => {
    test('delete user - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUser: IUserModel = await User.findOne({}) as IUserModel;

        const mockUser = jest.spyOn(userRequests, 'deleteUser');
        const answer = new Promise((res: IResolve<IUserModel>): void => res(fakeUser));
        mockUser.mockReturnValue(answer);

        request.params = {
            id: {
                userId: 'some id',
            },
        };

        response.locals = {
            user: {
                isAdmin: true,
            },
        };
        response.json = jest.fn(() => response);

        await remove(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('delete user - failure', async () => {
        const mockUser = jest.spyOn(userRequests, 'deleteUser');
        mockUser.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
        request.params = {
            id: {
                userId: '',
            },
        };

        response.locals = {
            user: {
                isAdmin: true,
            },
        };

        const answer = {
            message: 'Cannot delete user [object Object].',
            status: 409,
        };

        await remove(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
