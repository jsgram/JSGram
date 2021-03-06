import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { WriteComment } from './index';

export const writeCommentState = {
    loggedId: '1a',
    loggedUsername: 'Maks',
    postId: '1b',
    authorId: '1c',
    onChangeComments: [{postId: '1b', comment: ''}],
};

export const writeCommentActions = {
    onChangeComment: action('onChangeComment'),
    addComment: action('addComment'),
    emitNewNotificationSocket: action('emitNewNotificationSocket'),
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
