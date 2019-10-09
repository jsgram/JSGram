import React from 'react';
import ConnectedSideBar, { SideBar } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe('SideBar smart component', () => {
    let renderer: any;
    const mockStore = configureStore();
    const props = {
        urlUsername: 'somevalue',
    };
    const initialState = {
        user: 'somevalue',
        loading: true,
        profileEdit: {
            newUsername: 'somevalue',
            newFullName: 'somevalue',
        },
    };

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><ConnectedSideBar {...props} /></Provider>);
    });

    test('render-success', () => {
        expect(renderer.find(ConnectedSideBar).length).toEqual(1);
    });
});
