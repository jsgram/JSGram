import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Likes } from './index';

export const likesState = {
    userId: '1b',
    authorId: '5d723afacb0c0027cd1e5c95',
    loggedUsername: 'Maks',
    postId: '5d72faed2b49f34231709c53',
    authorsOfLike: ['1a', '2a', '3a', '4a', '5a', '6a', '7a'],
    loadingLike: false,
    loggedUserLikeExist: false,
};

export const likesActions = {
    addLike: action('addLike'),
    deleteLike: action('deleteLike'),
    emitNewNotificationSocket: action('emitNewNotificationSocket'),
};

storiesOf('Likes', module)
    .add('without like',
        () => <Likes {...{...likesState, ...likesActions}}/>,
    )
    .add('with like',
        () => <Likes {...{...likesState, loggedUserLikeExist: true, ...likesActions}}/>,
    )
    .add('loading like',
        () => <Likes {...{...likesState, loadingLike: true, ...likesActions}}/>,
    );
