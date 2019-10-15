import { ProfileEdit } from './index';
import { shallow } from 'enzyme';
import React from 'react';

describe('Profile edit component:', () => {
    let renderer: any;
    const handleSubmit = jest.fn(() => 'some value');
    const onChangeProfile = jest.fn(() => 'some value');
    const submitting = jest.fn(() => 'some value');

    beforeEach(() => {
        renderer = shallow(<ProfileEdit
            handleSubmit={handleSubmit}
            onChangeProfile={onChangeProfile}
            submitting={submitting}
        />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
