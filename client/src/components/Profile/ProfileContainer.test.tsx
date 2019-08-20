import { ProfileContainer } from './ProfileContainer';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('ProfileContainer component:', () => {
    let renderer;

    beforeEach(() => {
        const props = {
            user: 'someuser',
            loaded: true,
            loading: false,
            getUser: jest.fn(() => 'somevalue'),
            deletePhoto: jest.fn(() => 'someanothervalue'),
        };

        // tslint:disable:trailing-comma
        const store = configureStore()(props);
        renderer = shallow(
            <Provider store={store}>
                <ProfileContainer {...props} />
            </Provider>
        );
        // tslint:enable:trailing-comma
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(1155);
    });
});
