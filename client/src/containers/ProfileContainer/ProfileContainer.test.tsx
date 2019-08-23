import { ProfileContainer } from './index';

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

        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}>
                               <ProfileContainer {...props} />
                           </Provider>);
    });

    test('render - success', () => {
        // TODO to toHaveLength
        expect(renderer.html().length).toBeGreaterThan(1100);
    });
});
