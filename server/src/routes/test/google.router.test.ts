import {googleRouter} from '../auth.routes/google.router';

import {server} from '../../app';
import request from 'supertest';

describe('Google authentication router:', () => {
    beforeAll(() => {
        console.info = jest.fn();
    });

    test('GET authenentication - success', async () => {
        const req = await request(server).get('/auth/google');
        expect(req.status).toBe(302);
    });

    test('GET callback - success', async () => {
        const req = await request(server).get('/auth/google/callback');
        expect(req.status).toBe(302);
    });
});
