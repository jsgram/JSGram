import React from 'react';
import SideBarContainer, { SideBar } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { sideBarState } from './SideBar.stories';

describe('SideBar smart component', () => {
    let renderer: any;
    let store: any;
    const actions = {
        getUser: jest.fn(() => 'some value'),
        deletePhoto: jest.fn(() => 'some value'),
    };

    beforeEach(() => {
        store = configureStore()(sideBarState);
        renderer = shallow(<SideBar {...{...sideBarState, ...actions}} />);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(actions.getUser).toHaveReturnedWith('some value');
    });

    test('render - success', () => {
        renderer = shallow(<Provider
            store={store}><SideBarContainer {...{...sideBarState, ...actions}} /></Provider>);
        expect(renderer).toMatchSnapshot();
    });
});
