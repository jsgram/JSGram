import Login from './index';

import { shallow } from 'enzyme';
import React from 'react';

describe('Login component:', () => {
    let renderer: any;

    beforeEach(() => {
        const mockOnSubmit = jest.fn(() => 'some value');
        const mockHandleSubmit = jest.fn(() => 'some value');
        const mockSubmitting = true;

        renderer = shallow(<Login
            handleSubmit={mockHandleSubmit}
            onSubmit={mockOnSubmit}
            submitting={mockSubmitting} />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
