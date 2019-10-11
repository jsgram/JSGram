import Register from './index';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import React from 'react';

describe('Register component:', () => {
    let renderer;
    const mockHandleSubmit = jest.fn(() => 'somehandlesubmit');
    const mockSubmitting = true;
    const mockOnSubmit = jest.fn(() => 'somehandlesubmit');
    const mockInvalid = true;

    beforeEach(() => {
        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Form = jest.fn(() => (<div></div>));
        reactstrap.FormGroup = jest.fn(() => (<div></div>));
        reactstrap.Spinner = jest.fn(() => (<div></div>));

        renderer = shallow(<Register
            handleSubmit={mockHandleSubmit}
            submitting={mockSubmitting}
            onSubmit={mockOnSubmit}
            invalid={mockInvalid}/>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(33);
    });
});
