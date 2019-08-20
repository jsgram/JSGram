import Alert from './Alert';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import React from 'react';

describe('Alert component:', () => {
    const props = {
        message: 'somemessage',
        color: 'somecolor',
        clearAlert: (): string => 'somehandler',
    };
    let renderer;

    beforeEach(() => {
        reactstrap.UncontrolledAlert = jest.fn(() => (<div>{props.message}</div>));
        renderer = shallow(<Alert {...props} />);
    });

    test('componentDidMount - success', () => {
        expect(renderer.instance().timeout).toBe(2);
    });

    test('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(renderer.instance().timeout).toBe(0);
    });

    test('render - success', () => {
        expect(renderer.html()).toBe('<div>somemessage</div>');
    });
});
