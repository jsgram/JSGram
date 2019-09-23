import {
    SET_SUBSCRIBERS_PENDING,
    SET_SUBSCRIBERS,
    ALL_SUBSCRIBERS_LOADED,
    RESET_SUBSCRIBERS,
    CHANGE_USER_FOLLOWING,
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
            const subscribersCount = (subscribersNumber: number, typeOfSubscribers: string): number | string => {
                if (subscribersNumber) {
                    return subscribersNumber;
                }

                if (typeOfSubscribers === 'followers') {
                    return state.followersCount;
                }

                return state.followingCount;
            };
            const k = subscribersCount(action.payload.followersCount, 'followers');
            console.log(7, k);
            return {
                ...state,
                subscribers: [...state.subscribers, ...newSubscribers],
                page: action.payload.page,
                loading: false,
                followersCount: subscribersCount(action.payload.followersCount, 'followers'),
                followingCount: subscribersCount(action.payload.followingCount, 'following'),
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
                loading: false,
                allSubscribersLoaded: false,
                subscribers: [],
            };
        case CHANGE_USER_FOLLOWING:
            return {
                ...state,
                subscribers: state.subscribers.map((following: any) => following._id === action.payload ? {
                    ...following,
                    alreadyFollow: !following.alreadyFollow,
                } : following),
            };
        default: {
            return state;
        }
    }
};
