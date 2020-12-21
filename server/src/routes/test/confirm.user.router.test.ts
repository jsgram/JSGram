import {confirmUserRouter} from '../confirm.user.routes/confirm.user.router';

import {server} from '../../app';
import request from 'supertest';

describe('Confirmation router:', () => {
    beforeAll(() => {
        console.info = jest.fn();
    });

    test.skip('GET confirm user - failure', async () => {
        const req = await request(server).get('/confirm/:sometoken');
        expect(req.status).toBe(500);
    });

    test('POST resend user - failure', async () => {
        const req = await request(server).post('/confirm');
        expect(req.status).toBe(409);
    });

    test.skip('GET unknown route - failure', async () => {
        const req = await request(server).get('/confirm/fakeroute');
        expect(req.text).toBe('{"message":"Token does not exist"}');
    });
});
