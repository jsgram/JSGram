import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import { API } from '../../api';
import * as t from '../../alert/actionTypes';
import { registerUser } from '../actions';

import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Register test', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('Register async action', () => {

        fetchMock.put(`${process.env.REACT_APP_BASE_API!}/user/`, {
            headers: {'content-type': 'application/json'},
            body: {
                data: [1, 2, 3], status: 'ok',
            },
        });

        const expectedActions = [
            {
                type: t.SHOW_ALERT,
                message: 'test',
                color: 'test',
            },
            {
                meta: {
                    form: 'registerForm',
                },
                type: '@@redux-form/RESET',
            },
            {
                type: t.SHOW_ALERT,
                message: 'Can not create user',
                color: 'danger',
            },
        ];

        const expectedErrorActions = [
            {
                type: t.SHOW_ALERT,
                message: 'The email address you have entered is already associated with another account',
                color: 'danger',
            },
        ];

        const store = mockStore({});

        const mockUser = {
            username: 'test',
            email: 'test@test.ua',
            fullName: 'test',
            password: 'testdksfskfjdlsfj',
            photoPath: 'test',
        };

        return store.dispatch<any>(registerUser( mockUser)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
            .catch((e: Error) => {
                expect(store.getActions()).toEqual(expectedErrorActions);
            });
    });

});
