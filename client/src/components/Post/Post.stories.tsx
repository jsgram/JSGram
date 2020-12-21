import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../App';
import Post from './index';

const loggedUser = {
    isAdmin: false,
    loggedId: '1a',
    loggedPhotoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
    loggedUsername: 'Maks',
};

const user = {
    description: 'User description',
    email: 'maks@gmail.com',
    followers: [1, 2, 3],
    following: [1, 2, 3],
    fullName: 'Maks',
    photo: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
    posts: 1,
    privacy: {
        isActivityStatus: true,
        isPrivateAccount: false,
        isStorySharing: true,
    },
    subscriptions: {
        isNewsEmail: true,
        isProductEmail: true,
        isReminderEmail: true,
        isResearchEmail: true,
        isTextMessage: false,
    },
    username: 'Maks',
    _id: '1a',
};

const userPosts = {
    commentsLoaded: false,
    commentsLoading: false,
    commentsPage: 1,
    countOfLikes: 0,
    likeExist: false,
    loaded: false,
    loading: false,
    page: 1,
    posts: [
        {
            author: '1a',
            authorsOfLike: ['1f', '2f', '3f'],
            comments: ['1c', '2c', '3c'],
            description: '',
            imgPath: 'https://jsgram-post-images1.s3.eu-west-3.amazonaws.com/1567816427997',
            tags: [],
            _id: '1p',
        },
    ],
    selectedPost: {
        _id: '1p',
        author: '1a',
        description: 'Post description',
        imgPath: 'https://jsgram-post-images1.s3.eu-west-3.amazonaws.com/1567816427997',
    },
};

export const postState = {
    username: 'Maks',
    loggedUser,
    user,
    userPosts,
};

export const postActions = {
    getPostsAsync: action('getPostsAsync'),
    getMorePostsAsync: action('getMorePostsAsync'),
    deletePhoto: action('deletePhoto'),
    editPost: action('editPost'),
    showPost: action('showPost'),
    getUser: action('getUser'),
    resetPosts: action('resetPosts'),
    addNextPosts: action('addNextPosts'),
    changeEditStatus: action('changeEditStatus'),
    editDescriptionForPost: action('editDescriptionForPost'),
    newDescriptionForPost: action('newDescriptionForPost'),
};

storiesOf('Post', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('post', () => <Post {...{...postState, ...postActions}}/>);
