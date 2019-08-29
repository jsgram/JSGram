import PopUpModal from './index';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import React from 'react';

describe('PopUpModal component:', () => {
    let renderer;

    beforeEach(() => {
        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Modal = jest.fn(() => (<div></div>));
        reactstrap.ModalHeader = jest.fn(() => (<div></div>));
        reactstrap.ModalBody = jest.fn(() => (<div></div>));
        reactstrap.ModalFooter = jest.fn(() => (<div></div>));

        renderer = shallow(<PopUpModal />);
    });

    test('toggle - success', () => {
        renderer.instance().toggle();
        expect(renderer.state('modal')).toBe(true);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(33);
    });
});
