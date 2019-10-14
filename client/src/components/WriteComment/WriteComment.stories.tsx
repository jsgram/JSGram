import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { WriteComment } from './index';

export const writeCommentState = {
    loggedId: '1a',
    loggedUsername: 'Maks',
    postId: '1b',
    authorId: '1c',
    page: 1,
    searchResults: ['user1'],
    loaded: true,
    loading: false,
    onChangeComments: [{postId: '1b', comment: ''}],
};

export const writeCommentActions = {
    onChangeComment: action('onChangeComment'),
    addComment: action('addComment'),
    emitNewNotificationSocket: action('emitNewNotificationSocket'),
    clearSearchResults: action('clearSearchResults'),
    getSearchResults: action('getSearchResults'),
    addNextResults: action('addNextResults'),
};

storiesOf('WriteComment', module)
    .add('without comment',
        () => <WriteComment {...{
            ...writeCommentState,
            ...writeCommentActions,
        }}/>,
    )
    .add('with comment',
        () => <WriteComment {...{
            ...writeCommentState,
            onChangeComments: [{postId: '1b', comment: 'Nice photo'}],
            ...writeCommentActions,
        }}/>,
    );
