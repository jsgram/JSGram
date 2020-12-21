import { unfollowByUserId } from '../unfollow.requsets';

import mockingoose from 'mockingoose';
import { User } from '../../models/user.model';

type IFakeNext = () => void;

describe('Unfollow request tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('unfollowByUserId test', async () => {
        mockingoose(User).toReturn(null, 'findOneAndUpdate');
        const fakeUser = User.findOneAndUpdate();

        const mockUser = jest.spyOn(User, 'findOneAndUpdate');
        mockUser.mockReturnValue(fakeUser);

        const answer = await unfollowByUserId('userId', 'removeId', 'field', fakeNext);
    });
});
