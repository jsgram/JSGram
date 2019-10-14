import React from 'react';
import ProfilePasswordChangeContainer, { ProfilePasswordChange } from './index';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

describe('Profile password change component', () => {
    let renderer: any;
    let store: any;

    const props = {
        username: 'some value',
        changeProfilePassword: jest.fn(() => ('some value')),
        handleSubmit: jest.fn(() => ('some value')),
        submitting: jest.fn(() => ('some value')),
    };

    beforeEach(() => {
        store = configureStore()(props);
        renderer = shallow(<ProfilePasswordChange {...props}/>);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
