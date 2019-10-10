import React from 'react';
import PostByTag from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('PostByTag smart component', () => {
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

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><BrowserRouter><PostByTag {...props} /></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(1653);
    });
});
