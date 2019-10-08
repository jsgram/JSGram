import { ProfileContainer } from './index';
import * as profile from '../../components/Profile';

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

        profile.default = jest.fn(() => <div></div>);
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}>
                               <ProfileContainer {...props} />
                           </Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(40);
    });
});
