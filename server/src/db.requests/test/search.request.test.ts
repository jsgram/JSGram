import { findUsers } from '../search.request';

import mockingoose from 'mockingoose';
import { User } from '../../models/user.model';

type IFakeNext = () => void;

describe('Search tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('findUsers test', async () => {
        mockingoose(User).toReturn(null, 'find');
        const fakeUser = User.find();

        const mockUser = jest.spyOn(User, 'find');
        mockUser.mockReturnValue(fakeUser);

        const answer = await findUsers('someQuery', 3, fakeNext);
    });
});
