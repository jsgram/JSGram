import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import {showAlert} from '../../alert/actions';
import {uploadAvatarPending, uploadAvatarSuccess, uploadPostAvatar, uploadPutAvatar} from '../actions';
import image from '../../../components/assets/logo.png';

export const startState = {};

export const mockStore = configureMockStore([thunk]);

export const makeMockStore = (state: any = {}): any => {
    return mockStore({
        ...startState,
        ...state,
    });
};

const mockSuccess = (): any => ({status: 200});

describe('Avatar cropper', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches uploadPostAvatar with server data on success', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
        });

        const user = {
            posts: 2,
            followers: 3,
            following: 4,
            description: 'test',
            fullName: 'test',
            username: 'test',
            photo: 'test',
        };

        const expected = [
            uploadAvatarPending(),
            showAlert('Successfully uploaded', 'success'),
            uploadAvatarSuccess(user),
        ];
        store.dispatch(uploadPostAvatar(image))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            });
    });

    it('dispatches uploadPutAvatar with server data on success', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
        });

        const user = {
            posts: 2,
            followers: 3,
            following: 4,
            description: 'test',
            fullName: 'test',
            username: 'test',
            photo: 'test',
        };

        const expected = [
            showAlert('Successfully uploaded', 'success'),
            uploadAvatarSuccess(user),
        ];
        store.dispatch(uploadPutAvatar(image))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            });
    });
});
