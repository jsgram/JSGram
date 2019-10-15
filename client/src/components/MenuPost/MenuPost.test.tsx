import React from 'react';
import MenuPostContainer, { MenuPost } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('MenuPost component', () => {
    let renderer: any;
    const props = {
        post: jest.fn(() => 'some value'),
        authorId: 'some value',
        toggleEdit: jest.fn(() => 'some value'),
        toggleModal: jest.fn(() => 'some value'),
        deletePost: jest.fn(() => 'some value'),
    };
    let store: any;

    beforeEach(() => {
        store = configureStore()(props);
        renderer = shallow(<MenuPost {...props} />);
    });

    test('delete post handler - success', () => {
        renderer.instance().deletePostHandler();
        expect(props.toggleModal).toHaveReturnedWith('some value');
        expect(props.deletePost).toHaveReturnedWith('some value');
    });

    test('render-success', () => {
        renderer = shallow(<Provider store={store}><MenuPostContainer {...props} /></Provider>);
        expect(renderer).toMatchSnapshot();
    });
});
