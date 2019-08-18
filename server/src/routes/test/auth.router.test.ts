import {authRouter} from '../auth.router';

import {app} from '../../app';
import request from 'supertest';

describe('Authentication router:', () => {
    beforeAll(() => {
        console.info = jest.fn();
    });

    test.skip('POST login - failure', async () => {
        // TODO fix DB connection issue
        const req = await request(app).post('/auth/login');
        expect(req.status).toBe(409);
    });

    test('POST logout - success', async () => {
        const req = await request(app).post('/auth/logout');
        expect(req.status).toBe(302);
    });

    test('GET unknown route - failure', async () => {
        const req = await request(app).get('/auth/fakeroute');
        expect(req.text).toBe('{"message":"404, unknown page"}');
    });
});
