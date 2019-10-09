import React from 'react';
import Menu from './index';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {mount, shallow} from 'enzyme';

describe('Menu component', () => {
    let renderer: any;

    const props = {
        profileEdit: {
            newUsername: 'somevalue',
        },
        feed: {
            loggedUsername: 'somevalue',
        },
        search : {
            searchResults: [{
                _id: 'somevalue',
                username: 'somevalue',
                photoPath: 'somevalue',
                fullName: 'somevalue',
            }],
            page: 1,
            loaded: false,
            loading: true,
        },
        getSearchResults: jest.fn(() => ('somevalue')),
        clearSearchResults: jest.fn(() => ('somevalue')),
        addNextResults: jest.fn(() => ('somevalue')),
    };

    const mockStore = configureStore();

    beforeEach(() => {
        const store = mockStore(props);
        renderer = mount(<Provider store={store}><BrowserRouter><Menu {...props}/></BrowserRouter></Provider>);

    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(1500);
    });

    test('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(renderer.instance().timerHandle).toBe(undefined);
    });
});
