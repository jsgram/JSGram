import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import socketIoClient from 'socket.io-client';

const io = socketIoClient(`${process.env.REACT_APP_BASE_API}/notifications`);

export const joinRoomNotificationSocket = (loggedId: string): (dispatch: Dispatch) => void =>
    (dispatch: Dispatch): void => {
        io.emit('join room', loggedId);
    };

export const emitNewNotificationSocket = (userId: string, username: string, message: string):
    (dispatch: Dispatch) => void => (dispatch: Dispatch): void => {
        io.emit('add new notification', {userId, username, message});
    };

export const onNewNotificationSocket = (): (dispatch: Dispatch) => void => (dispatch: Dispatch): void => {
    io.on('add new notification', (({username, message}: {username: string, message: string}): any => {
        dispatch(showAlert(`${username} ${message}`, 'success'));
    }));
};
