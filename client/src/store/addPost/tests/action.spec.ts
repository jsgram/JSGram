import * as actions from '../action';
import * as types from '../actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const startState = {};

const mockStore = configureMockStore([thunk]);

const makeMockStore = (state: any = {}): any => (
    mockStore({
        ...startState,
        ...state,
    })
);

describe('Async actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should upload post', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expectedActions = [
            {type: actions.getPostPending()},
            {type: actions.resetAddPost()},
        ];
        store.dispatch(actions.uploadPost('croppedimage', 'description for image', 'volodia'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should crop image to post', () => {
        const croppedImage = 'someimage';
        const expectedAction = {
            type: types.SET_CROPPED_IMAGE_FOR_POST,
            payload: croppedImage,
        };
        expect(actions.setCroppedImageForPost(croppedImage)).toEqual(expectedAction);
    });

    it('Should add description to post', () => {
        const description = 'somedescription';
        const expectedAction = {
            type: types.SET_DESCRIPTION_FOR_POST,
            payload: description,
        };
        expect(actions.setDescriptionForPost(description)).toEqual(expectedAction);
    });
});
