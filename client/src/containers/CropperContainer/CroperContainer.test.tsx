import { CropperContainer } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('CropperContainer component:', () => {
    const props = {
        user: 'someuser',
        croppedImage: 'someimg',
        loading: false,
        toggleModal: false,
        uploadPostAvatar: jest.fn(() => 'somevalue'),
        setCroppedImageForAvatar: jest.fn(() => 'somevalue'),
        resetAddPost: jest.fn(() => 'somevalue'),
        informFileError: jest.fn(() => 'somevalue'),
    };
    let renderer;

    beforeEach(() => {
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}><CropperContainer {...props} /></Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(546);
    });
});
