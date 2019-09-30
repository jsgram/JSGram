import { SET_COMMENT_SOCKET_ID } from './actionTypes';

export interface ICommentSocket {
    socketId: string;
}

const defaultState = {
    socketId: '',
};

export const commentSocketReducer = (state: ICommentSocket = defaultState, action: { type: string, payload: string }):
    any => {
    switch (action.type) {
        case SET_COMMENT_SOCKET_ID:
            return {
                ...state,
                socketId: action.payload,
            };
        default:
            return state;
    }
};
