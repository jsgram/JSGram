import {
    userExist,
    checkUserByProp,
    editUser,
    editUserPassword,
    getUserByUsername,
} from '../user.requests';

import mockingoose from 'mockingoose';
import {IUserModel, User} from '../../models/user.model';

type IFakeNext = () => void;

describe('User requests tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */
        });
    });

    test('userExist test', async () => {
        mockingoose(User).toReturn(null, 'findOneAndUpdate');
        const fakeUser = User.findOneAndUpdate();

        const mockUser = jest.spyOn(User, 'findOneAndUpdate');
        mockUser.mockReturnValue(fakeUser);

        const answer = await userExist('email', fakeNext);
    });
    test('checkUserByProp test', async () => {
        mockingoose(User).toReturn(null, 'findOne');
        const fakeUser = User.findOne();

        const mockUser = jest.spyOn(User, 'findOne');
        mockUser.mockReturnValue(fakeUser);

        const answer = await checkUserByProp('someProp', fakeNext);
    });

    test('editUser test', async () => {
        mockingoose(User).toReturn(null, 'findOneAndUpdate');
        const fakeUser = User.findOneAndUpdate();

        const mockUser = jest.spyOn(User, 'findOneAndUpdate');
        mockUser.mockReturnValue(fakeUser);

        const answer = await editUser('someEmail', {}, fakeNext);
    });

    test('editUserPassword test', async () => {
        mockingoose(User).toReturn(null, 'findOneAndUpdate');
        const fakeUser = User.findOneAndUpdate();

        const mockUser = jest.spyOn(User, 'findOneAndUpdate');
        mockUser.mockReturnValue(fakeUser);

        const answer = await editUserPassword('someUsername', 'somePassword');
    });
    test('getUserByUsername test', async () => {
        mockingoose(User).toReturn(null, 'findOne');
        const fakeUser = User.findOne();

        const mockUser = jest.spyOn(User, 'findOne');
        mockUser.mockReturnValue(fakeUser);

        const answer = await getUserByUsername('someUsername', fakeNext);
    });
});
