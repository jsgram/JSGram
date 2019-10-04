import {
    SET_SUBSCRIBERS_PENDING,
    SET_SUBSCRIBERS,
    ALL_SUBSCRIBERS_LOADED,
    RESET_SUBSCRIBERS,
    CHANGE_USER_FOLLOWING, SET_SUBSCRIBERS_COUNT,
} from './actionTypes';

const defaultState = {
    page: 1,
    loading: false,
    allSubscribersLoaded: false,
    subscribers: [],
    followersCount: 0,
    followingCount: 0,
};

export const subscribersReducer = (state: any = defaultState, action: { type: string, payload: any }): any => {
    switch (action.type) {
        case SET_SUBSCRIBERS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case SET_SUBSCRIBERS:
            const newSubscribers = action.payload.subscribers.map((subscriber: any) => ({
                ...subscriber,
                alreadyFollow: subscriber.followers.includes(action.payload.loggedId),
            }));
            return {
                ...state,
                subscribers: [...state.subscribers, ...newSubscribers],
                page: action.payload.page,
                loading: false,
            };
        case SET_SUBSCRIBERS_COUNT:
            return {
                ...state,
                followersCount: action.payload.followersCount,
                followingCount: action.payload.followingCount,
            };
        case ALL_SUBSCRIBERS_LOADED:
            return {
                ...state,
                loading: false,
                allSubscribersLoaded: true,
            };
        case RESET_SUBSCRIBERS:
            return {
                page: 1,
                loading: true,
                allSubscribersLoaded: false,
                subscribers: [],
                followersCount: 0,
                followingCount: 0,
            };
        case CHANGE_USER_FOLLOWING:
            const subscribers = state.subscribers.map((following: any) => following._id === action.payload.userId ? {
                ...following,
                alreadyFollow: !following.alreadyFollow,
            } :
                following,
            );
            const followingCount = action.payload.followType === 'follow' ?
                state.followingCount + 1 : state.followingCount - 1;
            return {
                ...state,
                subscribers,
                followingCount,
            };
        default: {
            return state;
        }
    }
};
