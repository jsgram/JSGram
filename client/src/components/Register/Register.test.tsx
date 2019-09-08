import Register from './index';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import React from 'react';

describe('Register component:', () => {
    let renderer;

    beforeEach(() => {
        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Form = jest.fn(() => (<div></div>));
        reactstrap.FormGroup = jest.fn(() => (<div></div>));
        reactstrap.Spinner = jest.fn(() => (<div></div>));

        const handleSubmit = jest.fn(() => 'somehandlesubmit');
        renderer = shallow(<Register handleSubmit={handleSubmit} />);
    });

    test.skip('render - success', () => {
        expect(renderer.html()).toHaveLength(33);
    });
});
