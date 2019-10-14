import React from 'react';
import Comments from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as link from 'react-router-dom';

describe('Comments smart component', () => {
    let renderer;
    const initialState = {
        comments: {
            allCommentsLoaded: [],
        },
    };
    const mockStore = configureStore();
    const mockPostId = 'somevalue';
    link.Link = jest.fn(() => <div></div>);

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><Comments postId={mockPostId}/></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).not.toHaveLength(0);
    });
});
