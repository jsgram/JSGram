import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import { FeedPost } from './index';
import { Provider } from 'react-redux';
import { store } from '../../App';

export const feedPostState = {
    loggedId: '1a',
    loggedUsername: 'Maks',
    loggedPhotoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
    feedLoaded: false,
    feedLoading: false,
    newsFeed: {
        feedLoaded: true,
        feedLoading: false,
        page: 1,
        feed: [
            {
                _id: '1p',
                author: {
                    _id: '1a',
                    username: 'Maks',
                    photoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
                },
                authorsOfLike: ['1f', '2f', '3f'],
                comments: [],
                description: 'Post description',
                imgPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570605728486',
                tags: [],
            },
            {
                _id: '2p',
                author: {
                    _id: '1a',
                    username: 'Maks',
                    photoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
                },
                authorsOfLike: [],
                comments: [],
                description: 'Post description',
                imgPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570605706200',
                tags: [],
            },
            {
                _id: '3p',
                author: {
                    _id: '1a',
                    username: 'Maks',
                    photoPath: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
                },
                authorsOfLike: [],
                comments: [],
                description: 'Post description',
                imgPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570603193496',
                tags: [],
            },
        ],
        friendsRecommendations: {
            loading: false,
            users: [],
            page: 1,
        },
    },
    friendsRecommendations: {
        loading: false,
        users: [],
    },
};

export const feedPostActions = {
    getNewsFeedAsync: action('getNewsFeedAsync'),
    getMoreNewsFeedAsync: action('getMoreNewsFeedAsync'),
    addNextFeedPosts: action('addNextFeedPosts'),
    getRecommendations: action('getRecommendations'),
    followUser: action('followUser'),
    changeUsersFollowing: action('changeUsersFollowing'),
};

storiesOf('Feed Post', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('feed post', () => <FeedPost {...{...feedPostState, ...feedPostActions}}/>);
