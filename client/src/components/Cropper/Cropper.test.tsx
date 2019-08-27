import { Cropper } from './index';
import * as reactstrap from 'reactstrap';
import * as cropperactions from '../../store/cropper/actions';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe.skip('Cropper component:', () => { // TODO revisit after component finish
    let renderer;
    let store;

    beforeEach(() => {
        cropperactions.setAvatarToCropper = jest.fn(() => 'somevalue');
        cropperactions.uploadPostAvatar = jest.fn(() => 'somevalue');

        store = configureStore()();
        renderer = shallow(<Cropper
                               setAvatarToCropper={cropperactions.setAvatarToCropper}
                               uploadPostAvatar={cropperactions.uploadPostAvatar}
                           />);
    });

    test('onClose - success', () => {
        renderer.instance().onClose();
        expect(renderer.state('preview')).toBe(null);
    });

    test('onCrop - success', () => {
        renderer.instance().onCrop('somepreview');
        expect(renderer.state('preview')).toBe('somepreview');
    });

    test('onBeforeFileLoad - success', () => {
        const elem = {
            target: {
                files: [
                    { size: 2 ** 32 },
                ],
            },
        };

        renderer.instance().onBeforeFileLoad(elem);
        expect(elem.target.value).toBe('');
    });

    test('onFileLoad - success', () => {
        renderer.instance().onFileLoad();
        expect(cropperactions.setAvatarToCropper).toHaveReturnedWith('somevalue');
    });

    test('onClick - success', () => {
        renderer.instance().onClick();
        expect(renderer.state('preview')).toBe(null);
    });

    test('render - success', () => {
        reactstrap.Button = jest.fn(() => (<div></div>));
        reactstrap.Spinner = jest.fn(() => (<div></div>));

        renderer = shallow(<Provider store={store}><Cropper /></Provider>);
        expect(renderer.html()).toHaveLength(888);
    });
});
