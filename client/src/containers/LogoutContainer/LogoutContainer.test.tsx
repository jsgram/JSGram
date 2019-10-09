import { Logout } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('LogoutContainer component:', () => {
    const props = {
        logOut: jest.fn(() => 'somevalue'),
    };
    let renderer;

    beforeEach(() => {
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}><Logout {...props} /></Provider>);
    });
    test('render - success', () => {
        expect(renderer.html()).toHaveLength(0);
    });
});
