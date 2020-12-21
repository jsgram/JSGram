import { PopUpModal, IProps } from './index';
import { shallow } from 'enzyme';
import React from 'react';

describe('PopUpModal component:', () => {
    let renderer: any;

    beforeEach(() => {
        const props: IProps = {
            loading: true,
            modal: true,
            photo: 'cat',
            deletePhoto: jest.fn(() => 'some value'),
            toggleModal: jest.fn(() => 'some value'),
        };
        renderer = shallow(<PopUpModal {...props} />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
