import React from 'react';
import AddPostCropper from './index';
import { shallow } from 'enzyme';

describe('AddPostCropper component', () => {
    let renderer: any;

    const props = {
        loggedUsername: 'some value',
        croppedImage: 'some value',
        description: 'some value',
        loading: true,
        uploadPost: jest.fn(() => ('some value')),
        setCroppedImageForPost: jest.fn(() => ('some value')),
        setDescriptionForPost: jest.fn(() => ('some value')),
        resetAddPost: jest.fn(() => ('some value')),
        informFileError: jest.fn(() => ('some value')),
    };

    beforeEach(() => {
        renderer = shallow(<AddPostCropper {...props} />);
    });

    test('previous page - success', () => {
        renderer.instance().previousPage();
        expect(props.resetAddPost).toHaveReturnedWith('some value');
    });

    test('reset photo - success', () => {
        renderer.instance().resetPhoto();
        expect(props.resetAddPost).toHaveReturnedWith('some value');
    });

    test('on crop change - success', () => {
        renderer.instance().onCropChange({x: 1, y: 1});
        expect(renderer.state('crop')).toEqual({x: 1, y: 1});
    });

    test('on zoom change - success', () => {
        renderer.instance().onZoomChange(1);
        expect(renderer.state('zoom')).toBe(1);
    });

    test('reset image src - success', () => {
        renderer.instance().resetImageSrc();
        expect(renderer.state('imageSrc')).toBe('');
    });

    test('crop complete - success', () => {
        renderer.instance().onCropComplete({width: 1, height: 1, x: 1, y: 1}, {width: 1, height: 1, x: 1, y: 1});
        expect(renderer.state('croppedAreaPixels')).toEqual({height: 1, width: 1, x: 1, y: 1});
    });

    test('upload image file to server - success', () => {
        renderer.instance().onUploadPost();
        expect(props.uploadPost).toHaveReturnedWith('some value');
    });

    test('render-success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
