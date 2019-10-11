import RegisterContainer from './index';
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
            registerUser: 'somevalue',
            handleSubmit: jest.fn(() => 'somehandlesubmit'),
            submitting: false,
            invalid: true,
        };

        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}>
                               <RegisterContainer />
                           </Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(294);
    });
});
