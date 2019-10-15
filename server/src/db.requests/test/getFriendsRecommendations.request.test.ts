import { findUser } from '../getFriendsRecommendations.requests';

import mockingoose from 'mockingoose';
import { User } from '../../models/user.model';

type IFakeNext = () => void;

describe('Get Friends Recommendations tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('Find user test', async () => {
        mockingoose(User).toReturn(null, 'find');
        const fakeUser = User.find();

        const mockUser = jest.spyOn(User, 'find');
        mockUser.mockReturnValue(fakeUser);

        const answer = await findUser(5, fakeNext);
    });

});
