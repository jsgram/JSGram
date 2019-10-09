import React from 'react';
import SideBar from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as reactstrap from 'reactstrap';

describe('SideBar smart component', () => {
    let renderer;
    const mockStore = configureStore();
    const props = {
        urlUsername: 'somevalue',
    };
    const initialState = {
        profile: {
            user: {
                username: 'somevalue',
            },
            loading: true,
        },
        loading: true,
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
        reactstrap.Col = jest.fn(() => <div></div>);
        reactstrap.Container = jest.fn(() => <div></div>);
        reactstrap.Row = jest.fn(() => <div></div>);
        reactstrap.Spinner = jest.fn(() => <div></div>);
        reactstrap.Nav = jest.fn(() => <div></div>);
        const store = mockStore(initialState);
        renderer = shallow(<Provider store={store}><BrowserRouter><SideBar {...props} /></BrowserRouter></Provider>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(11);
    });
});
