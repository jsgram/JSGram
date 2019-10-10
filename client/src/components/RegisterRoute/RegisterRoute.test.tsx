import React from 'react';
import { RegisterRoute } from './index';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe('RegisterRoute component', () => {
    let renderer: any;

    const mockStore = configureStore();

    beforeEach(() => {
        const store = mockStore();
        renderer = mount(<Provider store={store}><BrowserRouter><RegisterRoute/></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html().length).toBeGreaterThan(1500);
    });
});
