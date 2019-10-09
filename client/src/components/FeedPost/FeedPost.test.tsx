import React from 'react';
import { FeedPost } from './index';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import * as reactstrap from 'reactstrap';

describe('FeedPost smart component', () => {
    let renderer;
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
        getNewsFeedAsync: jest.fn(() => 'somevalue'),
        getMoreNewsFeedAsync: jest.fn(() => 'somevalue'),
        addNextFeedPosts: jest.fn(() => 'somevalue'),
        getRecommendations: jest.fn(() => 'somevalue'),
        followUser: jest.fn(() => 'somevalue'),
        friendsRecommendations: {
            users: [],
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

    const mockStore = configureStore();

    beforeEach(() => {
        reactstrap.Col = jest.fn(() => <div></div>);
        reactstrap.Container = jest.fn(() => <div></div>);
        reactstrap.Row = jest.fn(() => <div></div>);
        reactstrap.Spinner = jest.fn(() => <div></div>);
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><BrowserRouter><FeedPost {...props} /></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(11);
    });
});
