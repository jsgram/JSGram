import { AddPostContainer } from './index';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('AddPostContainer component:', () => {
    const props = {
        croppedImage: 'someimg',
        description: 'somedescription',
        loading: false,
        uploadPost: jest.fn(() => 'somevalue'),
        setCroppedImageForPost: jest.fn(() => 'somevalue'),
        setDescriptionForPost: jest.fn(() => 'somevalue'),
        resetAddPost: jest.fn(() => 'somevalue'),
        informFileError: jest.fn(() => 'somevalue'),
        loggedUsername: jest.fn(() => 'somevalue'),
    };
    let renderer;

    beforeEach(() => {
        const store = configureStore()(props);
        renderer = shallow(<Provider store={store}><AddPostContainer {...props} /></Provider>);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(669);
    });
});
