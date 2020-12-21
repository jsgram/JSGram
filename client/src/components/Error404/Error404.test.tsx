import React from 'react';
import { Error404 } from './index';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

describe('Error404 component', () => {
    let renderer: any;

    beforeEach(() => {
        renderer = shallow(<BrowserRouter><Error404/></BrowserRouter>);
    });

    test('render-success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
