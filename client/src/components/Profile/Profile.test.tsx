import Profile from './index';
import * as reactstrap from 'reactstrap';

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

        renderer = shallow(<Profile {...props} />);
    });

    test.skip('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(mockGetUser).toHaveReturnedWith('somevalue');
    });

    test.skip('componentDidUpdate - success', () => {
        renderer.instance().componentDidUpdate({ loaded: false });
        expect(renderer.instance().timerHandle).toBe(6);
    });

    test.skip('componentWillUnmount - success', () => {
        renderer.instance().componentWillUnmount();
        expect(renderer.instance().timerHandle).toBe(0);
    });

    test.skip('render - success', () => {
        // TODO to toHaveLength
        expect(renderer.html().length).toBeGreaterThan(1120);
    });
});
