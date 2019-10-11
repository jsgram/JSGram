import { checkFollowing, followByUserId } from '../follow.requsets';

import mockingoose from 'mockingoose';
import { User } from '../../models/user.model';

type IFakeNext = () => void;

describe('Add like tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('checkFollowing test', async () => {
        mockingoose(User).toReturn(null, 'countDocuments');
        const fakeUser = User.countDocuments({});

        const mockUser = jest.spyOn(User, 'countDocuments');
        mockUser.mockReturnValue(fakeUser);

        const answer = await checkFollowing('loggedUserId', 'followingUserId', fakeNext);
    });

    test('followByUserId test', async () => {
        mockingoose(User).toReturn(null, 'findOneAndUpdate');
        const fakeUser = User.findOneAndUpdate();

        const mockUser = jest.spyOn(User, 'findOneAndUpdate');
        mockUser.mockReturnValue(fakeUser);

        const answer = await followByUserId('somePostId', 'fakeUserId', 'test', fakeNext);
    });

});
