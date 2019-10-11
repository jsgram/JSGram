import React from 'react';
import Post from './index';
import { shallow } from 'enzyme';

describe('Post component', () => {
    let renderer: any;
    const props = {
        userPosts: {
            selectedPost: {
                description: 'somevalue',
            },
            posts: [],
        },
        user: {
            posts: 1,
            followers: [],
            following: [],
            description: 'somevalue',
            fullName: 'somevalue',
            username: 'somevalue',
            photo: 'somevalue',
            email: 'somevalue',
            _id: 'somevalue',
        },
        editDescriptionForPost: 'somevalue',
        newDescriptionForPost: 'somevalue',
        username: 'somevalue',
        getPostsAsync: jest.fn(() => 'somevalue'),
        getMorePostsAsync: jest.fn(() => 'somevalue'),
        deletePhoto: jest.fn(() => 'somevalue'),
        editPost: jest.fn(() => 'somevalue'),
        showPost: jest.fn(() => 'somevalue'),
        getUser: jest.fn(() => 'somevalue'),
        resetPosts: jest.fn(() => 'somevalue'),
        addNextPosts: jest.fn(() => 'somevalue'),
        loggedUser: {
            loggedUsername: 'somevalue',
            loggedId: 'somevalue',
            loggedPhotoPath: 'somevalue',
            isAdmin: true,
        },
        changeEditStatus: jest.fn(() => 'somevalue'),
    };

    beforeEach(() => {
        renderer = shallow(<Post {...props}/>);
    });

    test('render-success', () => {
        expect(renderer.html()).toHaveLength(200);
    });
});
