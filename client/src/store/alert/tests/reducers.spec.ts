import { alertReducer, initialState } from '../reducers';
import * as t from '../actionTypes';

describe('alert reducer test', () => {
    it('SHOW_ALERT', () => {

        const action: any = {
            type: t.SHOW_ALERT,
            message: 'test',
            color: 'test',
        };

        expect(alertReducer(initialState, action)).toEqual({
            ...initialState,
            message: action.message,
            color: action.color,
        });
    });

    it('CLEAR_ALERT', () => {

        const action: any = {
            type: t.CLEAR_ALERT,
        };

        expect(alertReducer(initialState, action)).toEqual({
            ...initialState,
        });
    });
});
