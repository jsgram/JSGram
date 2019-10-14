import Profile from './index';
import { shallow } from 'enzyme';
import React from 'react';
import { profileState } from './Profile.stories';

describe('Profile component:', () => {
    let renderer: any;
    const getUser = jest.fn(() => 'some value');
    const followUser = jest.fn(() => 'some value');
    const unfollowUser = jest.fn(() => 'some value');
    const deletePhoto = jest.fn(() => 'some value');
    const resetPosts = jest.fn(() => 'some value');
    const getPostsAsync = jest.fn(() => 'some value');
    const deleteUser = jest.fn(() => 'some value');
    const emitNewNotificationSocket = jest.fn(() => 'some value');

    beforeEach(() => {
        const props = {
            getUser,
            followUser,
            unfollowUser,
            deletePhoto,
            resetPosts,
            getPostsAsync,
            deleteUser,
            emitNewNotificationSocket,

        };

        renderer = shallow(<Profile {...{...profileState, ...props}} />);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(getUser).toHaveReturnedWith('some value');
    });

    test('componentDidUpdate - success', () => {
        renderer.instance().componentDidUpdate({ loaded: true }, {}, {});
        expect(renderer.instance().timerHandle).toBe(0);
    });

    test('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(renderer.instance().timerHandle).toBe(0);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
