import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { SocketAPI } from '../../helpers/socket.connection';
import { ADD_NEW_NOTIFICATION, ADD_NEW_ROOM } from './notificationsConfig';

const socketNotifications = new SocketAPI('notifications');

export const joinRoomNotificationSocket = (loggedId: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await socketNotifications.emit(ADD_NEW_ROOM, loggedId);
        } catch (e) {
            console.error(e);
        }
    };

export const emitNewNotificationSocket = (userId: string, username: string, message: string):
    (dispatch: Dispatch) => Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            await socketNotifications.emit(ADD_NEW_NOTIFICATION, {userId, username, message});
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
            await socketNotifications.on(ADD_NEW_NOTIFICATION, fun);
        } catch (e) {
            console.error(e);
        }
    };
