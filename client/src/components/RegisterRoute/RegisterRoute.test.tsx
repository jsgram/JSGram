import React from 'react';
import { RegisterRoute } from './index';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe('RegisterRoute component', () => {
    let renderer;

    beforeEach(() => {
        const store = configureStore()();
        renderer = mount(<Provider store={store}><BrowserRouter><RegisterRoute/></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(1514);
    });
});
