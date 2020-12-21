import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {MenuPost} from './index';

const menuPostState = {
    modal: false,
    isMenuOpen: false,
    post: {
        author: '1a',
        authorsOfLike: ['1', '2', '3'],
        comments: [],
        description: 'Post description',
        newDescription: 'Post description',
        imgPath: 'https://jsgram-post-images1.s3.eu-west-3.amazonaws.com/1567816427997',
    },
    authorId: '1a',
};

const menuPostActions = {
    toggleEdit: action('toggleEdit'),
    toggleModal: action('toggleModal'),
    deletePost: action('deletePost'),
};

storiesOf('MenuPost', module)
    .add('menu post', () =>
        <MenuPost {...{...menuPostState, ...menuPostActions}}/>,
        );
