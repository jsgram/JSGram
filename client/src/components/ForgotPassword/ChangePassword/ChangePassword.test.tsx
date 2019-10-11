import { ChangePasswordContainer } from './index';
import * as reactstrap from 'reactstrap';
import * as changepassword from '../../../store/changePassword/actions';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('ChangePasswordContainer component:', () => {
    let renderer;

    beforeEach(() => {
        const handleSubmit = jest.fn(() => 'somehandlesubmit');

        changepassword.changePassword = jest.fn(() => 'something');

        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Form = jest.fn(() => (<div></div>));
        reactstrap.FormGroup = jest.fn(() => (<div></div>));
        reactstrap.Spinner = jest.fn(() => (<div></div>));

        const store = configureStore()();
        renderer = shallow(<Provider store={store}>
                               <ChangePasswordContainer handleSubmit={handleSubmit} />
                           </Provider>);
    });

    test.skip('onSubmit - success', () => {
        // shallow().instance() could be called on parent element only
        const changePassword = new ChangePasswordContainer({
            changePassword: changepassword.changePassword,
            match: {
                params: { token: 'sometoken' },
            },
        });

        changePassword.onSubmit();
        expect(changepassword.changePassword).toHaveLastReturnedWith('something');
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(164);
    });
});
