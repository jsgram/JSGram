import { AboutUs } from './index';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import React from 'react';

describe('AboutUs component:', () => {
    let renderer;

    beforeEach(() => {
        renderer = shallow(<BrowserRouter><AboutUs /></BrowserRouter>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(5834);
    });
});
