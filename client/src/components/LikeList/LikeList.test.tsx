import React from 'react';
import { LikeList } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('LikeList smart component', () => {
    let renderer: any;
    const props = {
        likeList: {
            feed: [],
            page: 1,
            feedLoaded: true,
            feedLoading: true,
            friendsRecommendations: {
                users: [],
                loading: true,
            },
        },
        getLikeListAsync: jest.fn(() => 'some value'),
        getMoreLikeListAsync: jest.fn(() => 'some value'),
        addNextLikeList: jest.fn(() => 'some value'),
        loggedId: 'some value',
    };

    const initialState = {
        profileEdit: {
            newUsername: 'some value',
        },
        feed: {
            loggedUsername: 'some value',
        },
        search: {
            searchResults: [],
        },
    };

    let store: any;

    beforeEach(() => {
        store = configureStore()(initialState);
        renderer = shallow(<LikeList {...props} />);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(props.getLikeListAsync).toHaveReturnedWith('some value');
    });

    test('get more like list - success', () => {
        renderer.instance().getMoreLikeList();
        expect(props.addNextLikeList).not.toHaveBeenCalled();
        expect(props.getMoreLikeListAsync).not.toHaveBeenCalled();
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
