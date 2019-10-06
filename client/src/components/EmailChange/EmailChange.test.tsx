import React from 'react';
import Index from './index';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('EmailChange smart component', () => {
    let renderer;
    const initialState = {
        user: 'somevalue',
        email: 'somevalue',
        changeEmail: jest.fn(() => 'somevalue'),
        profile: jest.fn(() => 'somevalue'),
    }
    const mockStore = configureStore();

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = mount(<Provider store={store}><Index /></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(477);
    });
});
