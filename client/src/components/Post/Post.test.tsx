import React from 'react';
import Post from './index';
import { shallow } from 'enzyme';

describe('Post component', () => {
    let renderer: any;
    const props = {
        userPosts: {
            selectedPost: {
                description: 'some value',
            },
            posts: [],
        },
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
        editDescriptionForPost: 'some value',
        newDescriptionForPost: 'some value',
        username: 'some value',
        getPostsAsync: jest.fn(() => 'some value'),
        getMorePostsAsync: jest.fn(() => 'some value'),
        deletePhoto: jest.fn(() => 'some value'),
        editPost: jest.fn(() => 'some value'),
        showPost: jest.fn(() => 'some value'),
        getUser: jest.fn(() => 'some value'),
        resetPosts: jest.fn(() => 'some value'),
        addNextPosts: jest.fn(() => 'some value'),
        loggedUser: {
            loggedUsername: 'some value',
            loggedId: 'some value',
            loggedPhotoPath: 'some value',
            isAdmin: true,
        },
        changeEditStatus: jest.fn(() => 'some value'),
    };

    beforeEach(() => {
        renderer = shallow(<Post {...props}/>);
    });

    test('toggle - success', () => {
        renderer.instance().toggle();
        expect(props.showPost).toHaveReturnedWith('some value');
    });

    test('toggle edit - success', () => {
        renderer.instance().toggleEdit({});
        expect(props.showPost).toHaveReturnedWith('some value');
        expect(props.changeEditStatus).toHaveReturnedWith('some value');
    });

    test('edit post - success', () => {
        renderer.instance().onEditPost();
        expect(props.editPost).toHaveReturnedWith('some value');
    });

    test('get more posts - success', () => {
        renderer.instance().getMorePosts();
        expect(props.addNextPosts).toHaveReturnedWith('some value');
        expect(props.getMorePostsAsync).toHaveReturnedWith('some value');
    });

    test('componentDidMount - success', () => {
        renderer.instance().componentDidMount();
        expect(props.getPostsAsync).toHaveReturnedWith('some value');
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
