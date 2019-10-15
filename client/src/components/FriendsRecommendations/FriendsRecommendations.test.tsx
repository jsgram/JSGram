import React from 'react';
import {FriendsRecomendations} from './index';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

describe('FriendsRecommendations component', () => {
    let renderer: any;

    const props = {
        loggedUsername: 'somevalue',
        friendsRecommendations: {
            users: [{
                photoPath: 'somevalue',
                _id: 'somevalue',
                username: 'somevalue',
            }],
            loading: false,
        },
        followUser: jest.fn(() => ('somevalue')),
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
        renderer = mount(<Provider store={store}>
            <BrowserRouter><FriendsRecomendations {...props}/></BrowserRouter>
        </Provider>);
    });

    test('render-success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
