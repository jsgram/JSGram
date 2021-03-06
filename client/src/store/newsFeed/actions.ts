import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    GET_NEWS_FEED_PENDING,
    GET_NEWS_FEED_SUCCESS,
    GET_MORE_NEWS_FEED_SUCCESS,
    UPLOAD_NEXT_FEED_POSTS,
    ALL_NEWS_FEED_LOADED,
    CLEAR_NEWS_FEED_LOADED,
    GET_RECOMMENDATIONS_PENDING,
    GET_RECOMMENDATIONS_SUCCESS,
    CHANGE_RECOMMENDATIONS_FOLLOWING,
} from './actionTypes';
import { INewsFeed } from './reducers';

export const getNewsFeedPending = (): { type: string } => ({
    type: GET_NEWS_FEED_PENDING,
});

export const getNewsFeedSuccess = (userNews: INewsFeed): { type: string, payload: any } => ({
    type: GET_NEWS_FEED_SUCCESS,
    payload: userNews,
});

export const getMoreNewsFeedSuccess = (userNews: any): { type: string, payload: any } => ({
    type: GET_MORE_NEWS_FEED_SUCCESS,
    payload: userNews,
});

export const addNextFeedPosts = (page: number): { type: string, payload: number } => ({
    type: UPLOAD_NEXT_FEED_POSTS,
    payload: page,
});

export const clearNewsFeedLoaded = (): { type: string } => ({
    type: CLEAR_NEWS_FEED_LOADED,
});

export const allNewsFeedLoaded = (): { type: string } => ({
    type: ALL_NEWS_FEED_LOADED,
});

export const getNewsFeedAsync = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getNewsFeedPending());
            const res = await AuthAPI.get('/feed/1');

            dispatch(getNewsFeedSuccess(res.data.feed));
            dispatch(clearNewsFeedLoaded());
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getMoreNewsFeedAsync = (page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getNewsFeedPending());
            const res = await AuthAPI.get(`/feed/${page}`);

            if (!res.data.feed.length) {
                dispatch(allNewsFeedLoaded());
                return;
            }

            dispatch(getMoreNewsFeedSuccess(res.data.feed));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getRecommendationsPending = (): { type: string } => ({
    type: GET_RECOMMENDATIONS_PENDING,
});

export const getRecommendationsSuccess = (users: object[]): { type: string, payload: object[] } => ({
    type: GET_RECOMMENDATIONS_SUCCESS,
    payload: users,
});

export const getRecommendations = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getRecommendationsPending());
            const res = await AuthAPI.get('/feed');
            dispatch(getRecommendationsSuccess(res.data.friendsRecommendations));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getPostsByTagAsync = (tagName: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getNewsFeedPending());
            const res = await AuthAPI.get(`/tag/${tagName}/1`);

            dispatch(getNewsFeedSuccess(res.data.posts));
            dispatch(clearNewsFeedLoaded());
        } catch (e) {
            dispatch(showAlert(e, 'danger'));
        }
    };

export const getMorePostsByTagAsync = (tagName: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getNewsFeedPending());
            const res = await AuthAPI.get(`/tag/${tagName}/${page}`);
            if (!res.data.posts.length) {
                dispatch(allNewsFeedLoaded());
                return;
            }

            dispatch(getMoreNewsFeedSuccess(res.data.posts));
        } catch (e) {
            dispatch(showAlert(e.response, 'danger'));
        }
    };

export const changeFollowing = (userId: string, followType: string):
    { type: string, payload: { userId: string, followType: string } } => ({
        type: CHANGE_RECOMMENDATIONS_FOLLOWING,
        payload: {userId, followType},
    });

export const changeUsersFollowing = (_id: string, followType: string):
    (dispatch: Dispatch) => Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            if (followType === 'follow') {
                await AuthAPI.post('/following/follow', {_id});
            } else {
                await AuthAPI.put(`/following/unfollow/${_id}`);
            }

            dispatch(changeFollowing(_id, followType));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
