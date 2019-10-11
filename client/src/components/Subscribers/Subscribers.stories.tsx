import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../App';
import { action } from '@storybook/addon-actions';
import {Subscribers} from './index';

const subscribersState = {
    path: '/profile/:username/followers',
    loggedId: '1a',
    loggedUsername: 'Maks',
    urlUsername: 'Maks',
    page: 1,
    allSubscribersLoaded: true,
    followersCount: 3,
    followingCount: 7,
    loaded: true,
    loading: false,
    loadFollow: false,
    user: {
        posts: 22,
        followers: [],
        following: [],
        description: '',
        fullName: 'Maks',
        username: 'Maks',
        photo: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
        email: 'maks@gmail.com',
        _id: '1a',
    },
    subscribers: [
        {
            alreadyFollow: false,
            followers: ['1f'],
            following: ['1a'],
            photoPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570605728486',
            username: 'oleg',
            _id: '1f',
        },
        {
            alreadyFollow: false,
            followers: ['1f'],
            following: ['1a'],
            photoPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570605706200',
            username: 'Helen',
            _id: '2f',
        },
        {
            alreadyFollow: false,
            followers: ['1f'],
            following: ['1a'],
            photoPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570603193496',
            username: 'oleg',
            _id: '3f',
        },
    ],
    length: 12,
};
const subscribersActions = {
    getUser: action('getUser'),
    getSubscribers: action('getSubscribers'),
    setSubscribersCount: action('setSubscribersCount'),
    changeUserFollowing: action('changeUserFollowing'),
    resetSubscribers: action('resetSubscribers'),
    emitNewNotificationSocket: action('emitNewNotificationSocket'),
};

storiesOf('Subscribers', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    // @ts-ignore
    .add('subscribers', () => <Subscribers {...{...subscribersState, ...subscribersActions}}/>);
