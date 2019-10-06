import React from 'react';
import { Likes } from './index';
import { shallow } from 'enzyme';

describe('Likes component', () => {
    let renderer;

    const props = {
        userId: 'somevalue',
        authorId: 'somevalue',
        loggedUsername: 'somevalue',
        postId: 'somevalue',
        authorsOfLike: [] as never,
        loadingLike: true,
        loggedUserLikeExist: true,
        addLike: jest.fn(() => 'somevalue'),
        deleteLike: jest.fn(() => 'somevalue'),
        emitNewNotificationSocket: jest.fn(() => 'somevalue'),
    }

    beforeEach(() => {
        renderer = shallow(<Likes {...props} />);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(146);
    });
});
