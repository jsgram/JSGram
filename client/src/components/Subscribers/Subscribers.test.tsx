import React from 'react';
import { Subscribers } from './index';
import { shallow } from 'enzyme';
import { subscribersState } from './Subscribers.stories';

describe('Subscribers smart component', () => {
    let renderer: any;
    const actions = {
        getUser: jest.fn(() => 'some value'),
        getSubscribers: jest.fn(() => 'some value'),
        setSubscribersCount: jest.fn(() => 'some value'),
        changeUserFollowing: jest.fn(() => 'some value'),
        resetSubscribers: jest.fn(() => 'some value'),
        emitNewNotificationSocket: jest.fn(() => 'some value'),
    };

    beforeEach(() => {
        // @ts-ignore
        renderer = shallow(<Subscribers {...{...subscribersState, ...actions}}/>);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(actions.getUser).toHaveReturnedWith('some value');
    });

    test('componentDidUpdate - success', () => {
        renderer.instance().componentDidUpdate({user: 'user', loggedId: 'legged id'}, {}, {});
        expect(actions.setSubscribersCount).toHaveReturnedWith('some value');
        expect(actions.getSubscribers).toHaveReturnedWith('some value');
    });

    test('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(actions.resetSubscribers).toHaveReturnedWith('some value');
    });

    test('get more followers - success', () => {
        renderer.instance().getMoreFollowers();
        expect(actions.getSubscribers).toHaveReturnedWith('some value');
    });

    test('follow subscriber - success', () => {
        renderer.instance().followSubscriber('id');
        expect(actions.changeUserFollowing).toHaveReturnedWith('some value');
        expect(actions.emitNewNotificationSocket).toHaveReturnedWith('some value');
    });

    test('unfollow subscriber - success', () => {
        renderer.instance().unfollowSubscriber('id');
        expect(actions.changeUserFollowing).toHaveReturnedWith('some value');
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
