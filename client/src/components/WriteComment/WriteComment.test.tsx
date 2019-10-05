import React from 'react';
import ConnectedWriteComment, { WriteComment } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('WriteComment smart component', () => {
    let renderer;
    const mockStore = configureStore();
    const props = {
        userId: 'somevalue',
        postId: 'somevalue',
    };
    const initialState = {
        loggedId: 'somevalue',
        loggedUsername: 'somevalue',
        onChangeComments: jest.fn(() => 'somevalue'),
    }

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><ConnectedWriteComment {...props} /></Provider>);
    });

    test('render-success', () => {
        expect(renderer.find(ConnectedWriteComment).length).toEqual(1);
    });
});
