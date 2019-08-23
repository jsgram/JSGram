import { AlertContainer } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('AlertContainer component:', () => {
    const props = {
        message: 'somemessage',
        color: 'somecolor',
        clearAlert: (): string => 'somehandler',
    };
    let renderer;

    beforeEach(() => {
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}><AlertContainer {...props} /></Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(195);
    });
});
