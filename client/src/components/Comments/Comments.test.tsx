import React from 'react';
import { Comments, mapStateToProps } from './index';
import { commentsState } from './Comments.stories';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Comments component', () => {
    let renderer: any;
    let store: any;
    let getComments: () => string;
    let resetComments: () => string;
    let editCommentAsync: () => string;
    let changeEditStatus: () => string;
    let changeComment: () => string;
    let deleteComment: () => string;
    let setDefaultCommentToChange: () => string;

    beforeEach(() => {
        store = configureStore()(commentsState);

        getComments = jest.fn(() => 'some value');
        resetComments = jest.fn(() => 'some value');
        editCommentAsync = jest.fn(() => 'some value');
        changeEditStatus = jest.fn(() => 'some value');
        changeComment = jest.fn(() => 'some value');
        deleteComment = jest.fn(() => 'some value');
        setDefaultCommentToChange = jest.fn(() => 'some value');

        const actions = {
            getComments,
            resetComments,
            editCommentAsync,
            changeEditStatus,
            changeComment,
            deleteComment,
            setDefaultCommentToChange,
        };

        renderer = shallow(<Comments {...{...commentsState, ...actions}}/>);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(getComments).toHaveReturnedWith('some value');
        expect(setDefaultCommentToChange).toHaveReturnedWith('some value');
    });

    test('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(resetComments).toHaveReturnedWith('some value');
    });

    test('getMoreComments - success', () => {
        renderer.instance().getMoreComments();
        expect(getComments).toHaveReturnedWith('some value');
    });

    test('edit - success', () => {
        renderer.instance().editComment('some value', '1c');
        expect(editCommentAsync).toHaveReturnedWith('some value');
    });

    test('delete - success', () => {
        renderer.instance().onDeleteComment('1c', '1c');
        expect(deleteComment).toHaveReturnedWith('some value');
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });

    test('render with redux - success', () => {
        const props = {
            getComments,
            resetComments,
            editCommentAsync,
            changeEditStatus,
            changeComment,
            deleteComment,
            setDefaultCommentToChange,
        };

        renderer = shallow(
            <Provider store={store}>
                <Comments {...{...commentsState, ...props}}/>
            </Provider>,
        );

        expect(renderer).toMatchSnapshot();
    });

    test('mapStateToPropsSuccess - success', () => {
        expect(mapStateToProps({
            comments: commentsState,
            feed: commentsState.feed,
        }, {postId: commentsState.postId})).toEqual(commentsState);
    });
});
