import React from 'react';
import LikeListContainer from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('LikeListContainer component:', () => {
    let renderer;
    const props = {
        likeList: {
            feed: [],
        },
        feed: {
            loggedId: 'somevalue',
        },
        profileEdit: {
            newUsername: 'somevalue',
        },
        search: {
            searchResults: [],
        },
    };

    beforeEach(() => {
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}><BrowserRouter><LikeListContainer/></BrowserRouter></Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(1393);
    });
});
