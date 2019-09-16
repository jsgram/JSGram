import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    ALL_POSTS_LOADED, CLEAR_LOADED,
    GET_MORE_POSTS_SUCCESS,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    DELETE_POST_PENDING,
    DELETE_POST_SUCCESS,
    EDIT_DESCRIPTION_FOR_POST,
    SHOW_SELECTED_POST, RESET_POSTS,
    UPLOAD_NEXT_POSTS,
    SET_COUNTS_OF_LIKES,
    CHECK_USER_LIKE_EXIST,
    ADD_USER_LIKE,
    REMOVE_USER_LIKE,
    ADD_COMMENT,
    RESET_COMMENT,
} from './actionTypes';
import { IPost } from './reducers';
import { decrementPostCount } from '../profile/actions';
import { addCommentDispatch } from '../comments/actions';

export const getPostsPending = (): { type: string } => ({
    type: GET_POSTS_PENDING,
});

export const getPostsSuccess = (posts: IPost): { type: string, payload: any } => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
});

export const getMorePostsSuccess = (posts: any): { type: string, payload: any } => ({
    type: GET_MORE_POSTS_SUCCESS,
    payload: posts,
});

export const allPostsLoaded = (): { type: string } => ({
    type: ALL_POSTS_LOADED,
});

export const clearLoaded = (): { type: string } => ({
    type: CLEAR_LOADED,
});

export const deletePostPending = (): { type: string } => ({
    type: DELETE_POST_PENDING,
});

export const deletePostSuccess = (postId: string): { type: string, payload: string } => ({
    type: DELETE_POST_SUCCESS,
    payload: postId,
});

export const showPost = (post: any): { type: string, payload: any } => ({
    type: SHOW_SELECTED_POST,
    payload: post,
});

export const editDescriptionForPost = (description: string, postId: string): { type: string, payload: any } => ({
    type: EDIT_DESCRIPTION_FOR_POST,
    payload: { description, postId },
});

export const addNextPosts = (page: number): { type: string, payload: number } => ({
    type: UPLOAD_NEXT_POSTS,
    payload: page,
});

export const resetPosts = (): { type: string } => ({
    type: RESET_POSTS,
});

export const addNewComment = (comment: string): { type: string, payload: string } => ({
    type: ADD_COMMENT,
    payload: comment,
});

export const resetComment = (): { type: string } => ({
    type: RESET_COMMENT,
});

export const getPostsAsync = (username: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(resetPosts());
            dispatch(getPostsPending());
            const res = await AuthAPI.get(`/profile/${username}/posts/1`);

            dispatch(getPostsSuccess(res.data.postsAll));
            dispatch(clearLoaded());
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getMorePostsAsync = (username: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getPostsPending());
            const res = await AuthAPI.get(`/profile/${username}/posts/${page}`);
            if (!res.data.postsAll.length) {
                dispatch(allPostsLoaded());
                return;
            }

            dispatch(getMorePostsSuccess(res.data.postsAll));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const deletePost = (postId: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(deletePostPending());
            const res = await AuthAPI.delete(`/post/${postId}`);
            dispatch(deletePostSuccess(postId));
            dispatch(decrementPostCount());
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const editPost = (description: any, id: any): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.patch(`/post/${id}`, JSON.stringify({ description }));
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

interface IBody {
    userId: string;
    postId: string;
}

export const checkUserLikeExist = (likeExist: boolean): { type: string, payload: any } => ({
    type: CHECK_USER_LIKE_EXIST,
    payload: likeExist,
});

export const setCountOfLikes = (countOfLikes: number): { type: string, payload: any } => ({
    type: SET_COUNTS_OF_LIKES,
    payload: countOfLikes,
});

export const addLoggedUserLike =
    (loggedUserId: string, postId: string, authorsOfLike: []): { type: string, payload: any } => ({
        type: ADD_USER_LIKE,
        payload: { loggedUserId, postId, authorsOfLike },
    });

export const removeLoggedUserLike =
    (loggedUserId: string, postId: string, authorsOfLike: []): { type: string, payload: any } => ({
        type: REMOVE_USER_LIKE,
        payload: { loggedUserId, postId, authorsOfLike },
    });

export const addLike = (body: IBody): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await AuthAPI.post(`likes/like/`, body);
            dispatch(checkUserLikeExist(true));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const deleteLike = (body: IBody): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { userId, postId }: IBody = body;
            await AuthAPI.delete(`likes/unlike/${postId}`, { data: { userId } });
            dispatch(checkUserLikeExist(false));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const addComment = (postId: string, authorId: string, comment: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post(`/comments`, { postId, authorId, comment });
            dispatch(addCommentDispatch(res.data.createdComment));
            dispatch(resetComment());
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
