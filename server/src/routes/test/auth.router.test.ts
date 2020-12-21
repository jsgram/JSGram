import {authRouter} from '../auth.routes/auth.router';

import {server} from '../../app';
import request from 'supertest';

describe('Authentication router:', () => {
    beforeAll(() => {
        console.info = jest.fn();
    });

    test.skip('POST login - failure', async () => {
        const req = await request(server).post('/auth/login');
        expect(req.status).toBe(409);
    });

    test('POST logout - success', async () => {
        const req = await request(server).post('/auth/logout');
        expect(req.status).toBe(302);
    });

    test('GET unknown route - failure', async () => {
        const req = await request(server).get('/auth/fakeroute');
        expect(req.text).toBe('{"message":"404, unknown page"}');
    });
});
