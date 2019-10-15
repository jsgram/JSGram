import React from 'react';
import PostByTag from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('PostByTag smart component', () => {
    let renderer: any;
    let store: any;
    const props = {
        loggedId: 'some value',
        loggedUsername: 'some value',
        loggedPhotoPath: 'some value',
        newsFeed: {
            feed: [],
            friendsRecommendations: {
                users: [],
            },
        },
        getPostsByTagAsync: jest.fn(() => 'some value'),
        getMorePostsByTagAsync: jest.fn(() => 'some value'),
        addNextFeedPosts: jest.fn(() => 'some value'),
        getRecommendations: jest.fn(() => 'some value'),
        followUser: jest.fn(() => 'some value'),
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
        store = configureStore()(initialState);
        renderer = shallow(<PostByTag {...props} />);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(props.getPostsByTagAsync).toHaveReturnedWith('some value');
        expect(props.getRecommendations).toHaveReturnedWith('some value');
    });

    test('get more feed posts - success', () => {
        renderer.instance().getMoreFeedPosts();
        expect(props.addNextFeedPosts).toHaveReturnedWith('some value');
        expect(props.getMorePostsByTagAsync).toHaveReturnedWith('some value');
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
