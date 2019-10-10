import React from 'react';
import { Subscribers } from './index';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe('Subscribers smart component', () => {
    let renderer: any;
    const mockStore = configureStore();
    const props = {
        path: 'somevalue',
        loggedId: 'somevalue',
        loggedUsername: 'somevalue',
        urlUsername: 'somevalue',
        user: {
            posts: 1,
            followers: [],
            following: [],
            description: 'somevalue',
            fullName: 'somevalue',
            username: 'somevalue',
            photo: 'somevalue',
            email: 'somevalue',
            _id: 'somevalue',
        },
        page: 1,
        allSubscribersLoaded: true,
        subscribers: [] as never,
        followersCount: 1,
        followingCount: 1,
        loaded: true,
        loading: true,
        loadFollow: true,
        getUser: jest.fn(() => 'somevalue'),
        getSubscribers: jest.fn(() => 'somevalue'),
        setSubscribersCount: jest.fn(() => 'somevalue'),
        changeUserFollowing: jest.fn(() => 'somevalue'),
        resetSubscribers: jest.fn(() => 'somevalue'),
        emitNewNotificationSocket: jest.fn(() => 'somevalue'),
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
        renderer = shallow(<Provider store={store}><BrowserRouter><Subscribers {...props}/></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(1521);
    });
});
