import React from 'react';
import SideBar from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('SideBar smart component', () => {
    let renderer: any;
    const mockStore = configureStore();
    const props = {
        urlUsername: 'somevalue',
    };
    const initialState = {
        profile: {
            user: 'somevalue',
            loading: true,
        },
        profileEdit: {
            newUsername: 'somevalue',
            newFullName: 'somevalue',
        },
        feed: {
            loggedUsername: 'somevalue',
        },
        search: {
            searchResults: [],
        },
    };

    beforeEach(() => {
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><BrowserRouter><SideBar {...props} /></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(2515);
    });
});
