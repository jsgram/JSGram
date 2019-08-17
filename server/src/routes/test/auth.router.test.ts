import {authRouter} from '../auth.router';
//import * as login from '../../controllers/auth.controllers/login';

import {app} from '../../app';
import request from 'supertest';

describe('Authentication router:', () => {
    beforeAll(() => {
        console.info = jest.fn();
    });

    test('POST login - success', async () => {
        //const mockLogin: jest.SpyInstance = jest.spyOn(login, 'login');
        //mockLogin.mockImplementation((req, res) => {res.redirect('/fake')});
        const req = await request(app).post('/auth/login');
        return expect(req).toBe(false);
    });

    test('POST logout - success', async () => {
        const req = await request(app).post('/auth/logout');
        expect(req).toBe(false);
    });

    test('GET unknown route - failure', async () => {
        const req = await request(app).get('/auth/fakeroute');
        expect(req.text).toBe('404, unknown page');
    });
});
