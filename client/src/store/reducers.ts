import { combineReducers } from 'redux';
import { alertReducer } from './alert/reducers';
import { reducer as formReducer } from 'redux-form';
import { profileReducer } from './profile/reducers';
import { cropperReducer } from './cropper/reducers';
import { addPostReducer } from './addPost/reducers';
import { changeEmailReducer } from './emailChange/reducers';
import { postReducer } from './post/reducers';
import { feedReducer } from './feed/reducers';
import { profileEditReducer } from './profileEdit/reducers';
import { newsFeedReducer } from './newsFeed/reducers';
import { likesReducer } from './likes/reducers';
import { commentsReducer } from './comments/reducers';
import { subscribersReducer } from './subscribers/reducers';
import { searchReducer } from './search/reducers';
import { likeListReducer } from './likesList/reducers';
import { mentionListReducer } from './mentionList/reducers';
import { USER_LOGOUT } from './profile/actionTypes';

export default (state: any, action: any): any => {
    if (action.type === USER_LOGOUT) {
        return undefined;
    }

    return appReducer(state, action);
};

const appReducer = combineReducers({
    form: formReducer,
    alert: alertReducer,
    profile: profileReducer,
    profileEdit: profileEditReducer,
    cropper: cropperReducer,
    addPost: addPostReducer,
    changeEmail: changeEmailReducer,
    userPosts: postReducer,
    feed: feedReducer,
    newsFeed: newsFeedReducer,
    likes: likesReducer,
    comments: commentsReducer,
    subscribers: subscribersReducer,
    search: searchReducer,
    likeList: likeListReducer,
    mentionList: mentionListReducer,
});
