import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import {API} from '../../api';
import * as t from '../../alert/actionTypes';
import {changePassword} from '../actions';

import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ChangePassword test', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('ChangePassword async action', () => {

        const token = 'tokentoken';

        fetchMock.put(`${process.env.REACT_APP_BASE_API!}/forgot-password/${token}`, {
            headers: {'content-type': 'application/json'},
            body: {
                data: {
                    status: 'test',
                    message: 'test',
                },
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
                message: 'Token does not exist',
                color: 'danger',
            },
        ];

        const store = mockStore({});

        return store.dispatch<any>(changePassword('password', token)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
            .catch((e: Error) => {
                expect(store.getActions()).toEqual(expectedErrorActions);
            });
    });

});
