import {
    SET_FOLLOWERS_PENDING,
    SET_FOLLOWERS,
    SET_MORE_FOLLOWERS,
    SET_NEXT_PAGE,
    ALL_FOLLOWERS_LOADED, CHANGE_USER_FOLLOWING,
} from './actionTypes';

const defaultState = {
    page: 1,
    loading: false,
    allFollowersLoaded: false,
    followers: [{
        _id: '',
        username: '',
        photoPath: '',
        followers: [],
        following: [],
        alreadyFollow: false,
    }],
};

export const followersReducer = (state: any = defaultState, action: { type: string, payload: any }): any => {
    switch (action.type) {
        case SET_FOLLOWERS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case SET_FOLLOWERS:
            return {
                ...state,
                loading: false,
                followers: action.payload.followers.map((follower: any) => ({
                    ...follower,
                    alreadyFollow: follower.followers.includes(action.payload.loggedId),
                })),
            };
        case SET_MORE_FOLLOWERS:
            const newFollowers = action.payload.followers.map((follower: any) => ({
                ...follower,
                alreadyFollow: follower.followers.includes(action.payload.loggedId),
            }));
            return {
                ...state,
                followers: [...state.followers, ...newFollowers],
                loading: false,
            };
        case CHANGE_USER_FOLLOWING:
            return {
                ...state,
                followers: state.followers.map((follower: any) => follower._id === action.payload ? {
                    ...follower,
                    alreadyFollow: !follower.alreadyFollow,
                } : follower),
            };
        case SET_NEXT_PAGE:
            return {
                ...state,
                page: action.payload + 1,
            };
        case ALL_FOLLOWERS_LOADED:
            return {
                ...state,
                allFollowersLoaded: true,
            };
        default: {
            return state;
        }
    }
};
