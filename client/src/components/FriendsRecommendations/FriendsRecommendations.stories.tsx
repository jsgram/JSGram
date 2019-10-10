import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import {FriendsRecomendations} from './index';

export const FriendsRecomendationsState = {
    loggedUsername: 'Maks',
    friendsRecommendations: {
        loading: false,
        users: [
            {
                _id: '1f',
                username: 'Diana',
                photoPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570605706200',
            },
            {
                _id: '2f',
                username: 'Antony',
                photoPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570605728486',
            },
            {
                _id: '3f',
                username: 'Bob',
                photoPath: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570603193496',
            },
        ],
    },
};

const FriendsRecomendationsActions = {
    followUser: action('followUser'),
};

storiesOf('Friends Recomendations', module)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('friends Recomendations', () =>
        <FriendsRecomendations {...{...FriendsRecomendationsState, ...FriendsRecomendationsActions}}/>);
