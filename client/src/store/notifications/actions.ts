import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { SocketAPI } from '../../helpers/socket.connection';

const socketNotifications = new SocketAPI('notifications');

export const LIKE_NOTIFICATION = 'liked your post';
export const COMMENT_NOTIFICATION = 'commented your post';
export const FOLLOW_NOTIFICATION = 'started following your post';

export const joinRoomNotificationSocket = (loggedId: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await socketNotifications.emit('join room', loggedId);
        } catch (e) {
            console.error(e);
        }
    };

export const emitNewNotificationSocket = (userId: string, username: string, message: string):
    (dispatch: Dispatch) => Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            await socketNotifications.emit('add new notification', {userId, username, message});
        } catch (e) {
            console.error(e);
        }
    };

export const onNewNotificationSocket = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const fun = (({username, message}: {username: string, message: string}): void => {
                dispatch(showAlert(`${username} ${message}`, 'success'));
            });
            await socketNotifications.on('add new notification', fun);
        } catch (e) {
            console.error(e);
        }
    };
