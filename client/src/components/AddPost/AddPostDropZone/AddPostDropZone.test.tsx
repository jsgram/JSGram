import React from 'react';
import AddPostDropZone from './index';
import { shallow } from 'enzyme';

describe('AddPostDropZone component', () => {
    let renderer: any;
    const mockUploadImageToCropper = jest.fn(() => ('some value'));
    const mockInformFileError = jest.fn(() => ('some value'));
    const mockResetImageSrc = jest.fn(() => ('some value'));
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
