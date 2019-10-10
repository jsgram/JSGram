import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import { Comments } from './index';
import './style.scss';

const comments = (username: string, comment: string, _id: string, isEdit: boolean): any => ({
    _id,
    postId: '1p',
    comment,
    authorId: '1a',
    isEdit,
    newComment: '',
    createdAt: '',
});

export const commentsState = {
    postId: '1p',
    comments: {
        ['1c']: comments('Maks', 'Nice photo', '1c', false),
        ['2c']: comments('Bob', 'Like it!', '2c', false),
        ['3c']: comments('Amanda', 'Hello', '3c', false),
        ['4c']: comments('Winston', 'LIKE', '4c', false),
        ['5c']: comments('Frenk', 'Nice photo', '5c', false),
    },
    authors: {
        ['1a']: {
            _id: '1a',
            email: 'maks@gmail.com',
            username: 'Maks',
            photoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
        },
    },
    commentsPage: [{postId: '5d72faed2b49f34231709c53', page: '1'}],
    commentsLoading: false,
    allCommentsLoaded: ['1p'],
    feed: {
        isAdmin: true,
        loggedId: '5d723afacb0c0027cd1e5c94',
        loggedPhotoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
        loggedUsername: 'didOstap',
    },
    allCommentsId: ['1c', '2c', '3c', '4c', '5c'],
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
    .add('with "get more comments" button', () => <Comments {...{
        ...commentsState,
        allCommentsLoaded: [], ...commentsActions,
    }}/>);
