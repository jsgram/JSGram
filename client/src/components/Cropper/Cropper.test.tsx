import Cropper from './index';
import { shallow } from 'enzyme';
import React from 'react';

describe('Cropper component:', () => {
    let renderer: any;

    const props = {
        croppedImage: 'some value',
        description: 'some value',
        loading: true,
        user: {
            posts: 1,
            followers: [],
            following: [],
            description: 'some value',
            fullName: 'some value',
            username: 'some value',
            photo: 'some value',
            email: 'some value',
            _id: 'some value',
        },
        uploadPostAvatar: jest.fn(() => ('some value')),
        setCroppedImageForAvatar: jest.fn(() => ('some value')),
        resetAddPost: jest.fn(() => ('some value')),
        toggleModal: jest.fn(() => ('some value')),
        informFileError: jest.fn(() => ('some value')),
    };

    beforeEach(() => {
        renderer = shallow(<Cropper {...props}/>);
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

    test('render-success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
