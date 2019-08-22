import { RegisterContainer } from './RegisterContainer';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('RegisterContainer component:', () => {
    let renderer;
    let mockRegisterUser;

    beforeEach(() => {
        reactstrap.FormGroup = jest.fn(() => (<div>{props.message}</div>));
        mockRegisterUser = jest.fn(() => 'someregisteruser');

        const props = {
            handleSubmit: jest.fn(() => 'somehandlesubmit'),
            submitting: false,
        };

        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}>
                               <RegisterContainer {...props} />
                           </Provider>);
    });

    test('onSubmit - success', () => {
        const registerContainer = new RegisterContainer({
            registerUser: mockRegisterUser,
        });

        registerContainer.onSubmit();
        expect(mockRegisterUser).toHaveBeenCalledTimes(1);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(294);
    });
});
