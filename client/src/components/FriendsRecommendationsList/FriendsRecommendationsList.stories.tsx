import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../App';
import { FriendsRecommendationsList } from './index';
import {FriendsRecomendationsState} from '../FriendsRecommendations/FriendsRecommendations.stories';

export const FriendsRecommendationsListState = {
    friendsRecommendations: FriendsRecomendationsState.friendsRecommendations,
};

export const FriendsRecommendationsListActions = {
    changeUsersFollowing: action('changeUserFollowing'),
    getRecommendations: action('getRecommendations'),
    isAlreadyFollow: false,
};

storiesOf('Friends Recomendations List', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('friends Recomendations List', () =>
        <FriendsRecommendationsList {...{...FriendsRecommendationsListState, ...FriendsRecommendationsListActions}}/>);
