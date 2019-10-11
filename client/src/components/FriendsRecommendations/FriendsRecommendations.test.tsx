import React from 'react';
import {FriendsRecomendations, IUser} from './index';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

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
    const mockStore = configureStore();

    beforeEach(() => {
        const store = mockStore(props);
        renderer = mount(<BrowserRouter><FriendsRecomendations {...props}/></BrowserRouter>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(415);
    });
});
