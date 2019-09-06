import {isTokenExist, deleteToken} from '../token.requests';

import mockingoose from 'mockingoose';
import {Token, ITokenModel, Token as t} from '../../models/token.model';

type IFakeNext = () => void;

describe('Token CRUD:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('token existence check - failure', async () => {
        mockingoose(Token).toReturn(null, 'findOne');
        const fakeToken = Token.findOne({});

        const mockTokenFindOne = jest.spyOn(t, 'findOne');
        mockTokenFindOne.mockReturnValue(fakeToken);

        const answer = await isTokenExist('sometoken', fakeNext);
        expect(fakeNext).toHaveBeenCalledTimes(1);
    });

    test('token deletion - failure', async () => {
        mockingoose(Token).toReturn(null, 'findOneAndRemove');
        const fakeToken = Token.findByIdAndRemove({});

        const mockTokenFindByIdAndRemove = jest.spyOn(t, 'findByIdAndRemove');
        mockTokenFindByIdAndRemove.mockReturnValue(fakeToken);

        await deleteToken('sometoken', fakeNext);
        expect(fakeNext).toHaveBeenCalledTimes(1);
    });
});
