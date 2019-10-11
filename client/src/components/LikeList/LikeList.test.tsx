import React from 'react';
import { LikeList } from './index';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe('LikeList smart component', () => {
    let renderer;
    const props = {
        likeList: {
            feed: [],
            page: 1,
            feedLoaded: true,
            feedLoading: true,
            friendsRecommendations: {
                users: [],
                loading: true,
            },
        },
        getLikeListAsync: jest.fn(() => 'somevalue'),
        getMoreLikeListAsync: jest.fn(() => 'somevalue'),
        addNextLikeList: jest.fn(() => 'somevalue'),
        loggedId: 'somevalue',
    };

    const initialState = {
        profileEdit: {
            newUsername: 'somevalue',
        },
        feed: {
            loggedUsername: 'somevalue',
        },
        search: {
            searchResults: [],
        },
    };

    const mockStore = configureStore();

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><BrowserRouter><LikeList {...props} /></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(1421);
    });
});
