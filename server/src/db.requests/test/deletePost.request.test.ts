import { deleteUser } from '../delete.user.requests';

import mockingoose from 'mockingoose';
import { User } from '../../models/user.model';

type IFakeNext = () => void;

describe('Delete user tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('deleteUser test', async () => {
        mockingoose(User).toReturn(null, 'findOneAndRemove');
        const fakeDeletedUser = User.findOneAndRemove();

        const mockRemoveUser = jest.spyOn(User, 'findOneAndRemove');
        mockRemoveUser.mockReturnValue(fakeDeletedUser);

        const answer = await deleteUser('sometoken', fakeNext);
    });
});
