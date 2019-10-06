import React from 'react';
import AddPostDropZone from './index';
import { shallow } from 'enzyme';

describe('AddPostDropZone component', () => {
    let renderer;
    const mockUploadImageToCropper = jest.fn(() => ('somevalue'));
    const mockInformFileError = jest.fn(() => ('somevalue'));
    const mockResetImageSrc = jest.fn(() => ('somevalue'));
    const mockSizeMB = 10;

    beforeEach(() => {
        renderer = shallow(<AddPostDropZone
            uploadImageToCropper={mockUploadImageToCropper}
            informFileError={mockInformFileError}
            resetImageSrc={mockResetImageSrc}
            sizeMB={mockSizeMB}
        />);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(360);
    });
});
