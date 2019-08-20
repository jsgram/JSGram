import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import { API } from '../../api';
import * as types from '../actionTypes';
import {data, uploadPostAvatar, uploadAvatarPending, uploadAvatarError} from '../actions';

import image from '../../../components/assets/logo.png';

import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Cropper test', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('data', () => {
        const formData = new FormData();
        formData.append('userPhoto', image);
        formData.append('enctype', 'multipart/form-data');
        expect(data(image)).toEqual(formData);
    });

    it('upload photo', () => {

        fetchMock.post(`${process.env.REACT_APP_BASE_API!}/profile/photo`, {
            headers: {'content-type': 'application/json'},

        });

        const expectedActions = [
            {
                type: types.UPLOAD_AVATAR_PENDING,
            },
            {
                type: types.UPLOAD_AVATAR_SUCCESS,
                payload: image,
            },
        ];

        const store = mockStore({});

        return store.dispatch<any>(uploadPostAvatar(image))
        .then(() => {
            expect(uploadAvatarPending()).toEqual(expectedActions);
        })
        .catch((e: Error) => {
            expect(uploadAvatarPending()).toEqual({type: types.UPLOAD_AVATAR_PENDING});
        });
    });

});
