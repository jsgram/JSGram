import { ProfileLikesContainer } from './index';

import { shallow } from 'enzyme';
import React from 'react';

describe('ProfileLikesContainer component:', () => {
    const props = {
        postId: 'somepostid',
        authorsOfLike: 'someauthorsoflike',
        authorId: 'someid',
        userId: 'someuserid',
        addLike: jest.fn(() => 'somevalue'),
        deleteLike: jest.fn(() => 'somevalue'),
        emitNewNotificationSocket: jest.fn(() => 'somevalue'),
        getLikes: jest.fn(() => 'somevalue'),
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
    };
    let renderer;

    beforeEach(() => {
        renderer = shallow(<ProfileLikesContainer {...props} />).dive();
    });
    test('render - success', () => {
        expect(renderer.html()).toHaveLength(93);
    });
});
