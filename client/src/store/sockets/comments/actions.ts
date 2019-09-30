import { Dispatch } from 'redux';
import { showAlert } from '../../alert/actions';
import socketIoClient from 'socket.io-client';

// const io = socketIoClient(`${process.env.REACT_APP_BASE_API}/comments`);
//
// export const connectCommentSocket = (): (dispatch: Dispatch) => void =>
//     (dispatch: Dispatch): void => {
//         io.on('set socket id', (data: any): void => {
//         });
//     };
//
// export const joinRoomComment = (loggedId: string): (dispatch: Dispatch) => void =>
//     (dispatch: Dispatch): void => {
//         io.emit('join room', loggedId);
//     };
//
// export const addNewCommentSocket = (): (dispatch: Dispatch) => void => (dispatch: Dispatch): void => {
//     io.on('add new comment', ((msg: string): any => {
//         console.log(777, msg);
//         dispatch(showAlert(msg, 'success'));
//     }));
// };
