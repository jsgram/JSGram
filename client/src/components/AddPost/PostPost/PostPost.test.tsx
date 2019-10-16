import React from 'react';
import { PostPhoto } from './index';
import { shallow } from 'enzyme';

describe('PostPost component', () => {
    let renderer: any;
    const mockCroppedImage = 'some value';
    const mockDescription = 'some value';
    const mockPage = 1;
    const mockSearchResults = [{
        _id: 'some value',
        username: 'some value',
        photoPath: 'some value',
        fullName: 'some value',
    }];
    const mockLoaded = false;
    const mockLoading = false;
    const mockClearSearchResults = jest.fn(() => ('some value'));
    const mockGetSearchResults = jest.fn(() => ('some value'));
    const mockAddNextResults = jest.fn(() => ('some value'));
    const mockSetDescForPost = jest.fn(() => ('some value'));

    beforeEach(() => {
        renderer = shallow(<PostPhoto
            croppedImage={mockCroppedImage}
            description={mockDescription}
            page={mockPage}
            searchResults={mockSearchResults}
            loaded={mockLoaded}
            loading={mockLoading}
            clearSearchResults={mockClearSearchResults}
            getSearchResults={mockGetSearchResults}
            addNextResults={mockAddNextResults}
            setDescriptionForPost={mockSetDescForPost}/>);
    });

    test('render - success', () => {
        expect(renderer.html()).not.toHaveLength(0);
    });
});
