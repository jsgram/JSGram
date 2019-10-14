import React from 'react';
import { FeedPost } from './index';
import { shallow } from 'enzyme';
import { feedPostState } from './FeedPost.stories';

describe('FeedPost smart component', () => {
    let renderer: any;
    const actions = {
        getNewsFeedAsync: jest.fn(() => 'some value'),
        getMoreNewsFeedAsync: jest.fn(() => 'some value'),
        addNextFeedPosts: jest.fn(() => 'some value'),
        getRecommendations: jest.fn(() => 'some value'),
        followUser: jest.fn(() => 'some value'),
    };

    beforeEach(() => {
        renderer = shallow(<FeedPost {...{...feedPostState, ...actions}} />);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(actions.getNewsFeedAsync).toHaveReturnedWith('some value');
        expect(actions.getRecommendations).toHaveReturnedWith('some value');
    });

    test('get more feed posts - success', () => {
        renderer.instance().getMoreFeedPosts();
        expect(actions.addNextFeedPosts).not.toHaveBeenCalled();
        expect(actions.getMoreNewsFeedAsync).not.toHaveBeenCalled();
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
