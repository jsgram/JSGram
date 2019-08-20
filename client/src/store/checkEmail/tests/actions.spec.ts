import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import { API } from '../../api';
import * as t from '../../alert/actionTypes';
import { checkEmail } from '../actions';

import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('CheckEmail', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('shows alert', () => {

        fetchMock.put(`${process.env.REACT_APP_BASE_API!}/forgot-password/`, {
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
        ];

        const expectedErrorActions = [
            {
                type: t.SHOW_ALERT,
                message: 'The email address you have entered isn\'t associated with another account',
                color: 'danger',
            },
        ];

        const store = mockStore({});

        return store.dispatch<any>(checkEmail( 'test@test.com')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
        .catch((e: Error) => {
            expect(store.getActions()).toEqual(expectedErrorActions);
        });

    });

});
