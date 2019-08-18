import {isTokenExist, deleteToken} from '../token.requests';

const fakeNext = jest.fn(() => { /* */ });

describe('Token CRUD:', () => {
    test.skip('token existence check - failure', async () => {
        // FIXME unidentified async issue
        // TODO mock Token.findOne
        const answer = await isTokenExist('sometoken', fakeNext);
        expect(answer).toBe({});
    });

    test.skip('token deletion - failure', async () => {
        // TODO fix DB connection issue
        // TODO mock Token
        const answer = await deleteToken('sometoken', fakeNext);
        expect(answer).toBe(undefined);
    });
});
