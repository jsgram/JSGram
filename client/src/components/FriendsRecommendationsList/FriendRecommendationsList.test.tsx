import React from 'react';
import FriendsRecommendationsList from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('FriendsRecommendationsList smart component', () => {
    let renderer;
    const mockStore = configureStore();
    const props = {
        friendsRecommendations: {
            users: [],
            loading: true,
        },
        getRecommendations: jest.fn(() => 'somevalue'),
        followUser: jest.fn(() => 'somevalue'),
    };
    const initialState = {
        newsFeed: {
            friendsRecommendations: {
                users: [],
                loading: true,
            },
        },
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
        renderer = shallow(<Provider store={store}>
            <BrowserRouter><FriendsRecommendationsList {...props}/></BrowserRouter>
        </Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(1193);
    });
});
