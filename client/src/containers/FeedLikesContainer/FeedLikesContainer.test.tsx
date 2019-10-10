import { FeedLikesContainer } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('FeedLikesContainer component:', () => {
    let renderer;
    const props = {};

    const initialState = {
        postId: 'somepostid',
        authorId: 'someid',
        feed: {
            loggedId: 'somevalue',
            loggedUsername: 'somevalue',
        },
        likes: {
            feedAuthorsOfLike: 'somevalue',
            loadingLike: true,
        },
        newsFeed: [],
    }

    beforeEach(() => {
        const store = configureStore()(initialState);
        renderer = shallow(<Provider store={store}><FeedLikesContainer /></Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(80);
    });
});
