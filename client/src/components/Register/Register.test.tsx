import Register from './index';

import { shallow } from 'enzyme';
import React from 'react';

describe('Register component:', () => {
    let renderer: any;
    const mockHandleSubmit = jest.fn(() => 'some handle submit');
    const mockSubmitting = true;
    const mockOnSubmit = jest.fn(() => 'some handle submit');
    const mockInvalid = true;

    beforeEach(() => {

        renderer = shallow(<Register
            handleSubmit={mockHandleSubmit}
            submitting={mockSubmitting}
            onSubmit={mockOnSubmit}
            invalid={mockInvalid}/>);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
