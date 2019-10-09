import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import { Comments } from './index';
import './style.scss';

const comments = (username: string, comment: string, _id: string, isEdit: boolean): any => {
    return {
        _id,
        postId: '5d72faed2b49f34231709c53',
        comment,
        authorId: {
            _id: '5d723afacb0c0027cd1e5c94',
            username,
            photoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
            email: 'dribnucko@gmail.com',
        },
        isEdit,
        newComment: '',
    };
};

const newComment = {
    _id: '5d72faed2b49f3423134340',
    postId: '5d72faed2b49f34231709c53',
    comment: 'Hi',
    authorId: {
        _id: '5d723afacb0c0027cd1e5c94',
        username: 'Karl',
        photoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
        email: 'dribnucko@gmail.com',
    },
    isEdit: true,
    newComment: 'New comment',
};

export const commentsState = {
    postId: '5d72faed2b49f34231709c53',
    comments: [
        comments('Maks', 'Nice photo', '5d72faed2b49f3423134341', false),
        comments('Bob', 'Like it!', '5d72faed2b49f3423134342', false),
        comments('Amanda', 'Hello', '5d72faed2b49f3423134343', false),
        comments('Winston', 'LIKE', '5d72faed2b49f3423134344', false),
        comments('Frenk', 'Nice photo', '5d72faed2b49f3423134345', false),
    ],
    commentsPage: [{postId: '5d72faed2b49f34231709c53', page: '1'}],
    commentsLoading: false,
    allCommentsLoaded: ['5d72faed2b49f34231709c53'],
    feed: {
        isAdmin: true,
        loggedId: '5d723afacb0c0027cd1e5c94',
        loggedPhotoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
        loggedUsername: 'didOstap',
    },
};

export const commentsActions = {
    getComments: action('getComments'),
    resetComments: action('resetComments'),
    editCommentAsync: action('editCommentAsync'),
    changeEditStatus: action('changeEditStatus'),
    changeComment: action('changeComment'),
    deleteComment: action('deleteComment'),
    setDefaultCommentToChange: action('setDefaultCommentToChange'),
};

storiesOf('Comments', module)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('default comments', () => <Comments {...{...commentsState, ...commentsActions}}/>)
    .add('with "get more comments" button',
        () => <Comments {...{
            ...commentsState,
            allCommentsLoaded: [],
            ...commentsActions,
        }}/>,
    )
    .add('edit comment',
        () => <Comments{...{
            ...commentsState,
            comments: [
                newComment,
                ...commentsState.comments,
            ],
            ...commentsActions,
        }}/>,
    );
