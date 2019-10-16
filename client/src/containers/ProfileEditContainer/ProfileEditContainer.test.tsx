import { ProfileEditContainer } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';
import * as reactstrap from 'reactstrap';

describe('ProfileEditContainer component:', () => {
    reactstrap.FormGroup = jest.fn(() => (<div></div>));
    const props = {
        handleSubmit: jest.fn(() => 'somehandlesubmit'),
        submitting: false,
    };
    let renderer;
    beforeEach(() => {
        const mockStoreData = {
            testForm: {
                testField: 'test value',
            },
        };
        const mockStore = configureStore();
        const store = mockStore(mockStoreData);
        renderer = shallow(<Provider store={store}><ProfileEditContainer {...props} /></Provider>);
    });
    test('render - success', () => {
        expect(renderer.html()).toHaveLength(349);
    });
});
