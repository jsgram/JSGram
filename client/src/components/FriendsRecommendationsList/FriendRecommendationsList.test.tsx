import React from 'react';
import FriendsRecommendations, { FriendsRecommendationsList } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('FriendsRecommendationsList smart component', () => {
    let renderer: any;
    let store: any;
    const props = {
        friendsRecommendations: {
            users: [],
            loading: true,
        },
        getRecommendations: jest.fn(() => 'some value'),
        followUser: jest.fn(() => 'some value'),
    };
    const initialState = {
        newsFeed: {
            friendsRecommendations: {
                users: [],
                loading: true,
            },
        },
        profileEdit: {
            newUsername: 'some value',
        },
        feed: {
            loggedUsername: 'some value',
        },
        search: {
            searchResults: [],
        },
    };

    beforeEach(() => {
        store = configureStore()(initialState);
        renderer = shallow(<BrowserRouter><FriendsRecommendationsList {...props}/></BrowserRouter>);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(props.getRecommendations).not.toBeCalled();
    });

    test('render - success', () => {
        renderer = shallow(<Provider store={store}>
            <BrowserRouter><FriendsRecommendations {...props}/></BrowserRouter>
        </Provider>);

        expect(renderer).toMatchSnapshot();
    });
});
