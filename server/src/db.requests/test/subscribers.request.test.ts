import { findUser, findSubscribers } from '../subscribers.requests';

import mockingoose from 'mockingoose';
import { User } from '../../models/user.model';

type IFakeNext = () => void;

describe('Subscribers request tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('findUser test', async () => {
        mockingoose(User).toReturn(null, 'findOne');
        const fakeUser = User.findOne();

        const mockUser = jest.spyOn(User, 'findOne');
        mockUser.mockReturnValue(fakeUser);

        const answer = await findUser('username', fakeNext);
    });

    test('findSubscribers test', async () => {
        mockingoose(User).toReturn(null, 'find');
        const fakeUser = User.find();

        const mockUser = jest.spyOn(User, 'find');
        mockUser.mockReturnValue(fakeUser);

        const answer = await findSubscribers([], 3, fakeNext);
    });
});
