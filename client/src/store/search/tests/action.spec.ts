import * as actions from '../actions';
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

describe('Search actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should get Posts Success', () => {
        const users = [{
            photoPath: 'somephotoPath',
            fullName: 'somefullname',
            username: 'someusername',
            _id: 'someid',
        }];
        const expectedAction = {
            type: types.GET_SEARCH_RESULTS_SUCCESS,
            payload: users,
        };
        expect(actions.getSearchResultsSuccess(users)).toEqual(expectedAction);
    });

    it('Should get Search Results Pending', () => {
        const expectedAction = {
            type: types.GET_SEARCH_RESULTS_PENDING,
        };
        expect(actions.getSearchResultsPending()).toEqual(expectedAction);
    });

    it('Should clear Search Results', () => {
        const expectedAction = {
            type: types.CLEAR_SEARCH_RESULTS,
        };
        expect(actions.clearSearchResults()).toEqual(expectedAction);
    });

    it('Should get More Results Success', () => {
        const users = [{
            photoPath: 'somephotoPath',
            fullName: 'somefullname',
            username: 'someusername',
            _id: 'someid',
        }];
        const expectedAction = {
            type: types.GET_MORE_RESULTS_SUCCESS,
            payload: users,
        };
        expect(actions.getMoreResultsSuccess(users)).toEqual(expectedAction);
    });

    it('Should all Results Loaded', () => {
        const expectedAction = {
            type: types.ALL_RESULTS_LOADED,
        };
        expect(actions.allResultsLoaded()).toEqual(expectedAction);
    });

    it('Should clear Loaded', () => {
        const expectedAction = {
            type: types.CLEAR_LOADED,
        };
        expect(actions.clearLoaded()).toEqual(expectedAction);
    });

    it('Should add Next Results', () => {
        const page = 1;
        const expectedAction = {
            type: types.ADD_NEXT_RESULTS,
            payload: page,
        };
        expect(actions.addNextResults(page)).toEqual(expectedAction);
    });

    it('Should getSearchResults', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });
        const users = [{
            photoPath: 'somephotoPath',
            fullName: 'somefullname',
            username: 'someusername',
            _id: 'someid',
        }];
        const expectedActions = [
            actions.getSearchResultsPending(),
            actions.clearLoaded(),
            actions.getSearchResultsSuccess(users),
        ];
        store.dispatch(actions.getSearchResults('somequery', 1))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
