import { ChangePassword } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';

describe('ChangePasswordContainer component:', () => {
    let renderer: any;
    const handleSubmit = jest.fn(() => 'some value');
    const changePassword = jest.fn(() => 'some value');
    const submitting = jest.fn(() => 'some value');
    const match = {
        params: {
            token: 'some value',
        },
    };

    beforeEach(() => {
        const store = configureStore()();
        renderer = shallow(<ChangePassword
            handleSubmit={handleSubmit}
            changePassword={changePassword}
            submitting={submitting}
            match={match}
        />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
