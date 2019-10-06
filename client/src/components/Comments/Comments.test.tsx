import React from 'react';
import ConnectedComments, { Comments } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Comments smart component', () => {
    let renderer;
    const initialState = {
        comments: 'somevalue',
    };

    const mockStore = configureStore();
    const mockPostId = 'somevalue';

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><ConnectedComments postId={mockPostId}/></Provider>);
    });

    test('render-success', () => {
        expect(renderer.find(ConnectedComments).length).toEqual(1);
    });
});
