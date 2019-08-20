import Alert from './Alert';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

const props = {
    message: 'somemessage',
    color: 'somecolor',
    clearAlert: () => 'somehandler',
};

const alert = new Alert(props);
const renderer = shallow(<Alert {...props} />);

describe('Alert component:', () => {
    test('componentDidMount - success', () => {
        alert.componentDidMount();
        expect(alert.timeout).toBe(3);
    });

    test('componentWillUnmount - success', () => {
        alert.componentWillUnmount();
        expect(alert.timeout).toBe(0);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(195);
    });
});
