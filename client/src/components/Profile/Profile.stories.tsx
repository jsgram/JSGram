import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { store } from '../../App';
import { MemoryRouter } from 'react-router-dom';
import Profile from './index';

export const profileState = {
    urlUsername: 'Maks',
    loggedId: '1a',
    loggedUsername: 'Maks',
    loggedUser: {
        isAdmin: false,
        loggedId: '1a',
        loggedPhotoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
        loggedUsername: 'Maks',
    },
    user: {
        description: 'User description',
        email: 'maks@gmail.com',
        followers: [1, 2, 3, 4, 5],
        following: [1, 2, 3],
        fullName: 'Maks',
        photo: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
        posts: 23,
        username: 'Maks',
        _id: '1a',
    },
    loaded: false,
    loading: false,
    loadFollow: false,
};

const profileActions = {
    getUser: action('getUser'),
    followUser: action('followUser'),
    unfollowUser: action('unfollowUser'),
    deletePhoto: action('deletePhoto'),
    resetPosts: action('resetPosts'),
    getPostsAsync: action('getPostsAsync'),
    deleteUser: action('deleteUser'),
    emitNewNotificationSocket: action('emitNewNotificationSocket'),
};

storiesOf('Profile', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('profile', () => <Profile {...{...profileState, ...profileActions}}/>);
