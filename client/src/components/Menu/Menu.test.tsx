import React from 'react';
import MenuContainer, { Menu } from './index';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

describe('Menu component', () => {
    let renderer: any;

    const props = {
        loggedUsername: 'some value',
        newUsername: 'some new value',
        searchResults: [{
            _id: 'some value',
            username: 'some value',
            photoPath: 'some value',
            fullName: 'some value',
        }],
        page: 1,
        loaded: false,
        loading: true,
        getSearchResults: jest.fn(() => ('some value')),
        clearSearchResults: jest.fn(() => ('some value')),
        addNextResults: jest.fn(() => ('some value')),
    };

    let store: any;

    beforeEach(() => {
        store = configureStore()(props);
        renderer = shallow(<Menu {...props}/>);
    });

    test('toggle - success', () => {
        renderer.instance().toggle();
        expect(renderer.state('isMenuOpen')).toEqual(true);
    });

    test('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(props.clearSearchResults).toHaveReturnedWith('some value');
        expect(renderer.state('searchValue')).toBe('');
    });

    test('getMoreResults - success', () => {
        renderer.instance().getMoreResults();
        expect(props.addNextResults).toHaveReturnedWith('some value');
        expect(props.getSearchResults).toHaveReturnedWith('some value');
    });

    test('render - success', () => {
        renderer = shallow(<Provider store={store}><MenuContainer {...props}/></Provider>);
        expect(renderer).toMatchSnapshot();
    });
});
