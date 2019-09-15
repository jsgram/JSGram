import {
    SET_FOLLOWING_PENDING,
    SET_FOLLOWING,
    SET_MORE_FOLLOWING,
    SET_NEXT_PAGE,
    ALL_FOLLOWING_LOADED,
} from './actionTypes';
import { CHANGE_USER_FOLLOWING } from '../followers/actionTypes';

const defaultState = {
    page: 1,
    loading: false,
    allFollowingLoaded: false,
    following: [{
        _id: '',
        username: '',
        photoPath: '',
        followers: [],
        following: [],
        alreadyFollow: false,
    }],
};

export const followingReducer = (state: any = defaultState, action: { type: string, payload: any }): any => {
    switch (action.type) {
        case SET_FOLLOWING_PENDING:
            return {
                ...state,
                loading: true,
            };
        case SET_FOLLOWING:
            return {
                ...state,
                loading: false,
                following: action.payload.following.map((followings: any) => ({
                    ...followings,
                    alreadyFollow: followings.following.includes(action.payload.loggedId),
                })),
            };
        case SET_MORE_FOLLOWING:
            const newFollowings = action.payload.following.map((followings: any) => ({
                ...followings,
                alreadyFollow: followings.following.includes(action.payload.loggedId),
            }));
            return {
                ...state,
                following: [...state.following, ...newFollowings],
                loading: false,
            };
        case CHANGE_USER_FOLLOWING:
            return {
                ...state,
                following: state.following.map((following: any) => following._id === action.payload ? {
                    ...following,
                    alreadyFollow: !following.alreadyFollow,
                } : following),
            };
        case SET_NEXT_PAGE:
            return {
                ...state,
                page: action.payload + 1,
            };
        case ALL_FOLLOWING_LOADED:
            return {
                ...state,
                allFollowingLoaded: true,
            };
        default: {
            return state;
        }
    }
};
