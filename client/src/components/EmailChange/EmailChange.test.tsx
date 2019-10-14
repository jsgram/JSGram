import React from 'react';
import EmailChange, { Index } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('EmailChange smart component', () => {
    let renderer: any;
    const props = {
        user: {
            username: 'some value',
            email: 'some value',
            fullName: 'some value',
            password: 'some value',
            photoPath: 'some value',
            description: 'some value',
        },
        email: 'some value',
        changeEmail: jest.fn(() => 'some value'),
        setEmailText: jest.fn(() => 'some value'),
    };
    const store = configureStore()(props);

    beforeEach(() => {
        renderer = shallow(<Index {...props} />);
    });

    test('render-success', () => {
        renderer = shallow(<Provider store={store}><EmailChange/></Provider>);
        expect(renderer).toMatchSnapshot();
    });
});
