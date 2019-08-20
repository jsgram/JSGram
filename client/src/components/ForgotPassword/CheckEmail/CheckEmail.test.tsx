import { CheckEmail } from './CheckEmail';
import * as reactstrap from 'reactstrap';
import * as checkemail from '../../../store/checkEmail/actions';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('CheckEmail component:', () => {
    let renderer;

    beforeEach(() => {
        const handleSubmit = jest.fn(() => 'somehandlesubmit');

        checkemail.checkEmail = jest.fn(() => 'something');

        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Form = jest.fn(() => (<div></div>));
        reactstrap.FormGroup = jest.fn(() => (<div></div>));
        reactstrap.Spinner = jest.fn(() => (<div></div>));

        // tslint:disable:trailing-comma
        const store = configureStore()();
        renderer = shallow(
            <Provider store={store}>
                <CheckEmail handleSubmit={handleSubmit} />
            </Provider>
        );
        // tslint:enable:trailing-comma
    });
    test('onSubmit - success', () => {
        // shallow().instance() could be called on parent element only
        const checkEmail = new CheckEmail({
            checkEmail: checkemail.checkEmail,
        });

        checkEmail.onSubmit();
        expect(checkemail.checkEmail).toHaveLastReturnedWith('something');
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(164);
    });
});
