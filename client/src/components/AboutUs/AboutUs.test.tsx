import { AboutUs } from './index';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import React from 'react';

describe('AboutUs component:', () => {
    let renderer: any;

    beforeEach(() => {
        renderer = shallow(<BrowserRouter><AboutUs /></BrowserRouter>);
    });

    test('render - success', () => {
        expect(renderer.html()).not.toHaveLength(0);
    });
});
