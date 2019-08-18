import {confirmUserRouter} from '../confirm.user.router';

import {app} from '../../app';
import request from 'supertest';

describe('Confirmation router:', () => {
    beforeAll(() => {
        console.info = jest.fn();
    });

    test.skip('GET confirm user - failure', async () => {
        // TODO fix DB connection issue
        const req = await request(app).get('/confirm/:sometoken');
        expect(req.status).toBe(500);
    });

    test('POST resend user - failure', async () => {
        const req = await request(app).post('/confirm');
        expect(req.status).toBe(409);
    });

    test.skip('GET unknown route - failure', async () => {
        // TODO fix DB connection issue
        const req = await request(app).get('/confirm/fakeroute');
        // FIXME 500 might not be the best status code for this route
        expect(req.text).toBe('{"message":"Token does not exist"}');
    });
});
