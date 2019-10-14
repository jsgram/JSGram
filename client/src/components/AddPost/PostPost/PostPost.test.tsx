import React from 'react';
import { PostPhoto } from './index';
import { shallow } from 'enzyme';

describe('PostPost component', () => {
    let renderer: any;
    const mockCroppedImage = 'some value';
    const mockDescription = 'some value';
    const mockSetDescForPost = jest.fn(() => ('some value'));

    beforeEach(() => {
        renderer = shallow(<PostPhoto
            croppedImage={mockCroppedImage}
            description={mockDescription}
            setDescriptionForPost={mockSetDescForPost}/>);
    });

    test('render - success', () => {
        expect(renderer.html()).toMatchSnapshot();
    });
});
