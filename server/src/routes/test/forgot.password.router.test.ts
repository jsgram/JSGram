import {forgotPassword} from '../forgot.password.controllers/forgot.password';

import {app} from '../../app';
import request from 'supertest';

describe('Forgot password router:', () => {
    beforeAll(() => {
        console.info = jest.fn();
    });

    test.skip('GET reset password - failure', async () => {
        // TODO fix DB connection issue
        const req = await request(app).get('/forgot-password/:sometoken');
        expect(req.status).toBe(409);
    });

    test('POST check email - failure', async () => {
        const req = await request(app).post('/forgot-password');
        expect(req.status).toBe(409);
    });

    test.skip('PUT update password - failure', async () => {
        // TODO fix DB connection issue
        const req = await request(app).put('/forgot-password/:sometoken');
        expect(req.status).toBe(500);
    });

    test.skip('GET unknown route - failure', async () => {
        // TODO fix DB connection issue
        const req = await request(app).get('/forgot-password/fakeroute');
        // TODO message seems a bit unexpected
        expect(req.text).toBe('{"message":"Password has not been reset"}');
    });
});
