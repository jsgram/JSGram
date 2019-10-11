import React from 'react';
import AddPostCropper from './index';
import { shallow } from 'enzyme';

describe('AddPostCropper component', () => {
    let renderer;

    const props = {
        loggedUsername: 'somevalue',
        croppedImage: 'somevalue',
        description: 'somevalue',
        loading: true,
        uploadPost: jest.fn(() => ('somevalue')),
        setCroppedImageForPost: jest.fn(() => ('somevalue')),
        setDescriptionForPost: jest.fn(() => ('somevalue')),
        resetAddPost: jest.fn(() => ('somevalue')),
        informFileError: jest.fn(() => ('somevalue')),
    }

    beforeEach(() => {
        renderer = shallow(<AddPostCropper { ...props } />);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(733);
    });
});
