import React from 'react';
import PostsByTagContainer from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('PostsByTagContainer smart component', () => {
    let renderer: any;
    const mockStore = configureStore();
    const props = {
        loggedId: 'somevalue',
        loggedUsername: 'somevalue',
        loggedPhotoPath: 'somevalue',
        newsFeed: {
            feed: [],
            friendsRecommendations: {
                users: [],
            },
        },
        getPostsByTagAsync: jest.fn(() => 'somevalue'),
        getMorePostsByTagAsync: jest.fn(() => 'somevalue'),
        addNextFeedPosts: jest.fn(() => 'somevalue'),
        getRecommendations: jest.fn(() => 'somevalue'),
        followUser: jest.fn(() => 'somevalue'),
        friendsRecommendations: [],
        match: {
            params: {
                tagName: [],
            },
        },
    };

    const initialState = {
        newsFeed: {
            feed: [],
            page: 1,
            feedLoaded: true,
            feedLoading: true,
            friendsRecommendations: {
                users: [],
            },
        },
        feed: {
            loggedId: 'somevalue',
            loggedUsername: 'somevalue',
            loggedPhotoPath: 'somevalue',
        },
        profileEdit: {
            newUsername: 'somevalue',
        },
        search: {
            searchResults: [],
        },
    };

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}>
            <BrowserRouter><PostsByTagContainer {...props}/></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(1755);
    });
});
