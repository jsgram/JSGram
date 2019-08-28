import {
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
} from './actionTypes';

// interface IPosts {
//     image: string;
//     description: string;
//     likes: number;
// }
//
// interface IPostsItems extends Array<IPosts> {}

// TODO Change to real data

const defaultState = {
    posts: [
        {
            avatar: '',
            first_name: '',
            id: 100,
        },
    ],
};

export const postReducer = (
        state: any = defaultState,
        action: { type: string, payload: any }): any => {
    switch (action.type) {
    case GET_POSTS_PENDING:
        return {
            ...state,
        };
    case GET_POSTS_SUCCESS:
        return {
            ...state,
            posts: action.payload,
        };
    case GET_POSTS_ERROR:
        return {
            ...state,
        };
    default:
        return state;
    }
};
