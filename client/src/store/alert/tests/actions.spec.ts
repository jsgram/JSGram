import { showAlert, clearAlert } from '../actions';
import * as types from '../actionTypes';

describe('Alert actions', () => {
    it('showAlert', () => {

        const expectedAction = {
            type: types.SHOW_ALERT,
            message: 'test',
            color: 'test',
        };

        expect(showAlert('test', 'test')).toEqual(expectedAction);
    });

    it('clearAlert', () => {
        expect(clearAlert()).toEqual({
            type: types.CLEAR_ALERT,
        });
    });
});
