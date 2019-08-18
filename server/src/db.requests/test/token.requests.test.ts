import {isTokenExist, deleteToken} from '../token.requests';

const fakeNext = jest.fn(() => { /* */ });

describe('Token CRUD:', () => {
    test.skip('token existence check - failure', async () => {
        // FIXME unidentified async issue
        // TODO mock Token.findOne
        const ans = await isTokenExist('sometoken', fakeNext);
        expect(ans).toBe({});
    });

    test.skip('token deletion - failure', async () => {
        // TODO fix DB connection issue
        // TODO mock Token
        const ans = await deleteToken('sometoken', fakeNext);
        expect(ans).toBe(undefined);
    });
});
