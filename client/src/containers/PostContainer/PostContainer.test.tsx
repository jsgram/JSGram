import { PostContainer } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('PostContainer component:', () => {
    const props = {
        userPosts: {
            posts: [
                {
                    description: 'somedesc',
                    _id: 'someid',
                },
            ],
            selectedPost: {
                description: 'somedesc',
                _id: 'someid',
            },
            _id: 'someid',
        },
        user: {
            _id: 'someid',
        },
        getPostsAsync: jest.fn(() => 'somevalue'),
        getMorePostsAsync: jest.fn(() => 'somevalue'),
        editDescriptionForPost: jest.fn(() => 'somevalue'),
        loggedUser: 'someuser',
        newDescriptionForPost: 'somedesc',
    };
    let renderer;

    beforeEach(() => {
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}><PostContainer {...props} /></Provider>);
    });
    test('render - success', () => {
        expect(renderer.html()).toHaveLength(330);
    });
});
