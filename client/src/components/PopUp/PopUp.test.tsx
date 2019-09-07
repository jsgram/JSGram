import { PopUpModal, IProps } from './index';
import * as reactstrap from 'reactstrap';

import { shallow } from 'enzyme';
import React from 'react';

describe('PopUpModal component:', () => {
    let renderer;

    beforeEach(() => {
        const props: IProps = {
            loading: true,
            modal: true,
            photo: 'cat',
            deletePhoto: jest.fn(() => { /* */ }),
            toggleModal: jest.fn(() => { /* */ }),
        };

        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Modal = jest.fn(() => (<div></div>));
        reactstrap.ModalHeader = jest.fn(() => (<div></div>));
        reactstrap.ModalBody = jest.fn(() => (<div></div>));
        reactstrap.ModalFooter = jest.fn(() => (<div></div>));

        renderer = shallow(<PopUpModal {...props} />);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(22);
    });
});
