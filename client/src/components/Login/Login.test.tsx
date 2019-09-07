import Login from './index';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import React from 'react';

describe('Login component:', () => {
    let renderer;

    beforeEach(() => {
        const mockOnSubmit = jest.fn(() => 'somevalue');
        const mockHandleSubmit = jest.fn(() => 'somevalue');

        reactstrap.Spinner = jest.fn(() => (<div></div>));
        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Form = jest.fn(() => (<div></div>));
        reactstrap.FormGroup = jest.fn(() => (<div></div>));

        renderer = shallow(<Login handleSubmit={mockHandleSubmit} onSubmit={mockOnSubmit} />);
    });

    test.skip('render - success', () => {
        expect(renderer.html()).toHaveLength(168);
    });
});
