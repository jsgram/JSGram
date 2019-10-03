import Profile from './index';
import * as reactstrap from 'reactstrap';
import * as reactContentLoader from 'react-content-loader';

import { shallow } from 'enzyme';
import React from 'react';

describe('Profile component:', () => {
    let renderer;
    let mockGetUser;

    beforeEach(() => {
        reactstrap.Spinner = jest.fn(() => (<div></div>));
        reactstrap.Button = jest.fn(() => (<div></div>));

        mockGetUser = jest.fn(() => 'somevalue');
        const props = {
            user: {},
            getUser: mockGetUser,
            loaded: true,
        };

        reactContentLoader.Instagram = jest.fn(() => <div></div>);
        renderer = shallow(<Profile {...props} />);
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(mockGetUser).toHaveReturnedWith('somevalue');
    });

    test('componentDidUpdate - success', () => {
        renderer.instance().componentDidUpdate({ loaded: false });
        expect(renderer.instance().timerHandle).toBe(6);
    });

    test('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(renderer.instance().timerHandle).toBe(0);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(11);
    });
});
