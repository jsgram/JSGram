import React from 'react';
import ConnectedFriendsRecommendationsList, { FriendsRecommendationsList } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

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
        friendsRecommendations: {
            users: [],
            loading: true,
        },
    };

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><ConnectedFriendsRecommendationsList {...props}/></Provider>);
    });

    test('render-success', () => {
        expect(renderer.find(ConnectedFriendsRecommendationsList).length).toEqual(1);
    });
});
