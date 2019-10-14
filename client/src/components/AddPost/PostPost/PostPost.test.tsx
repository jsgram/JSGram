import React from 'react';
import { PostPhoto } from './index';
import { shallow } from 'enzyme';

describe('PostPost component', () => {
    let renderer;
    const mockCroppedImage = 'somevalue'
    const mockDescription = 'somevalue'
    const mockSetDescForPost = jest.fn(() => ('somevalue'));

    beforeEach(() => {
        renderer = shallow(<PostPhoto
            croppedImage={mockCroppedImage}
            description={mockDescription}
            setDescriptionForPost={mockSetDescForPost}/>);
    });

    test.skip('render-success', () => {
        expect(renderer.html()).toHaveLength(373);
    });
});
