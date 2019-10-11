import React from 'react';
import WriteComment from './index';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('WriteComment smart component', () => {
    let renderer;
    const mockStore = configureStore();
    const props = {
        authorId: 'somevalue',
        postId: 'somevalue',
    };
    const initialState = {
        authorId: 'somevalue',
        postId: 'somevalue',
        feed: {
            loggedId: 'somevalue',
            loggedUsername: 'somevalue',
        },
        comments: {
            onChangeComments: [],
        },
    };

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = mount(<Provider store={store}><WriteComment {...props} /></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(11);
    });
});
