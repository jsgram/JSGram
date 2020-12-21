import { isTokenExist, deleteToken } from '../token.requests';

import mockingoose from 'mockingoose';
import { Token } from '../../models/token.model';

type IFakeNext = () => void;

describe('Token requests tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('isTokenExist test', async () => {
        mockingoose(Token).toReturn(null, 'findOne');
        const fakeToken = Token.findOne();

        const mockToken = jest.spyOn(Token, 'findOne');
        mockToken.mockReturnValue(fakeToken);

        const answer = await isTokenExist('token', fakeNext);
    });

    test('deleteToken test', async () => {
        mockingoose(Token).toReturn(null, 'findOneAndDelete');
        const fakeToken = Token.findOneAndDelete();

        const mockToken = jest.spyOn(Token, 'findOneAndDelete');
        mockToken.mockReturnValue(fakeToken);

        const answer = await deleteToken('someId', fakeNext);
    });
});
