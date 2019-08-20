import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import { API } from '../../api';
import * as types from '../../alert/actionTypes';
import { loginUser } from '../actions';

import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login test', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('Login async test', () => {

        fetchMock.post(`${process.env.REACT_APP_BASE_API!}/auth/login/`, {
            headers: {'content-type': 'application/json'},
            body: {
                status: 'ok',
            },
        });

        const expectedActions = [
            {
                type: types.SHOW_ALERT,
                message: 'Welcome',
                color: 'success',
            },
        ];

        const expectedErrorActions = [
            {
                type: types.SHOW_ALERT,
                message: 'You entered invalid email or password',
                color: 'danger',
            },
        ];

        const store = mockStore({});

        const mockUser = {
            email: 'test@test.ua',
            password: 'testdksfskfjdlsfj',
        };

        return store.dispatch<any>(loginUser( mockUser)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
        .catch((e: Error) => {
            expect(store.getActions()).toEqual(expectedErrorActions);
        });
    });

});
