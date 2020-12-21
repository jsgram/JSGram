import { LoginContainer } from './index';
import * as loginuser from '../../store/login/actions';
import * as settoken from '../../store/login/setToken.helper';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('LoginContainer component:', () => {
    let renderer;

    beforeEach(() => {
        const handleSubmit = jest.fn(() => 'somehandlesubmit');

        loginuser.loginUser = jest.fn(() => 'somevalue');
        reactstrap.Form = jest.fn(() => (<div></div>));
        settoken.setToken = jest.fn(() => 'somevalue');

        const match = { params: { token: 'sometoken' } };

        const store = configureStore()();
        renderer = shallow(<Provider store={store}>
                               <LoginContainer match={match} handleSubmit={handleSubmit} />
                           </Provider>);
    });

    test.skip('onSubmit - success', () => {
        // shallow().instance() could be called on parent element only
        const loginContainer = new LoginContainer({
            loginUser: loginuser.loginUser,
            match: {
                params: { token: 'sometoken' },
            },
        });
        loginContainer.onSubmit();

        expect(loginuser.loginUser).toHaveLastReturnedWith('somevalue');
    });

    test.skip('componentWillMount - success', () => {
        // shallow().instance() could be called on parent element only
        const loginContainer = new LoginContainer({
            setToken: settoken.setToken,
            match: {
                params: { token: 'sometoken' },
            },
        });
        loginContainer.componentWillMount();

        expect(settoken.setToken).toHaveLastReturnedWith('somevalue');
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(168);
    });
});
