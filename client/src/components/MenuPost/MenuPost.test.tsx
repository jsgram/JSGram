import React from 'react';
import MenuPost from './index';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('MenuPost component', () => {
    let renderer;
    const props = {
        post: jest.fn(() => 'somevalue'),
        authorId: 'somevalue',
        toggleEdit: jest.fn(() => 'somevalue'),
        toggleModal: jest.fn(() => 'somevalue'),
    }
    const mockStore = configureStore();

    beforeEach(() => {
        const store = mockStore();
        renderer = mount(<Provider store={store}><MenuPost {...props} /></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(500);
    });
});
