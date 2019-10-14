import React from 'react';
import WriteCommentContainer, { WriteComment } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { writeCommentState } from './WriteComment.stories';

describe('WriteComment smart component', () => {
    let renderer: any;
    let store: any;
    const actions = {
        onChangeComment: jest.fn(() => 'some value'),
        addComment: jest.fn(() => 'some value'),
        emitNewNotificationSocket: jest.fn(() => 'some value'),
    };

    beforeEach(() => {
        store = configureStore()(writeCommentState);
        renderer = shallow(<WriteComment {...{...writeCommentState, ...actions}} />);
    });

    test('on add comment - success', () => {
        renderer.instance().onAddComment('id', 'some value');
        expect(actions.addComment).toHaveReturnedWith('some value');
        expect(actions.emitNewNotificationSocket).toHaveReturnedWith('some value');
    });

    test('render - success', () => {
        renderer = shallow(<Provider store={store}><WriteComment {...{...writeCommentState, ...actions}} /></Provider>);

        expect(renderer).toMatchSnapshot();
    });
});
