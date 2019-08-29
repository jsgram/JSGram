import { Main } from './Landing';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import React from 'react';

describe('Main component:', () => {
    let renderer;

    beforeEach(() => {
        reactstrap.Container = jest.fn(() => (<div></div>));
        reactstrap.Row = jest.fn(() => (<div></div>));
        reactstrap.Col = jest.fn(() => (<div></div>));

        renderer = shallow(<Main />);
    });

    test('render - success', () => {
        expect(renderer.html()).toBe('<div></div>');
    });
});
