import { FeedLikesContainer } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('FeedLikesContainer component:', () => {
    const props = {
        postId: 'somepostid',
        authorsOfLike: 'someauthorsoflike',
        authorId: 'someid',
        userId: 'someuserid',
        addLike: jest.fn(() => 'somevalue'),
        deleteLike: jest.fn(() => 'somevalue'),
        emitNewNotificationSocket: jest.fn(() => 'somevalue'),
    };
    let renderer;

    beforeEach(() => {
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}><FeedLikesContainer {...props} /></Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(80);
    });
});
