import React from 'react';
import { Likes } from './index';
import { shallow } from 'enzyme';

describe('Likes component', () => {
    let renderer: any;

    const props = {
        userId: 'some value',
        authorId: 'some value',
        loggedUsername: 'some value',
        postId: 'some value',
        authorsOfLike: [],
        loadingLike: true,
        loggedUserLikeExist: true,
        addLike: jest.fn(() => 'some value'),
        deleteLike: jest.fn(() => 'some value'),
        emitNewNotificationSocket: jest.fn(() => 'some value'),
    };

    beforeEach(() => {
        renderer = shallow(<Likes {...props} />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
