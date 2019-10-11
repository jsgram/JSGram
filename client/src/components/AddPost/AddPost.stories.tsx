import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddPostCropper from './AddPostCropper';

export const addPostState = {
    croppedImage: '',
    description: '',
    loading: false,
    loggedUsername: 'Maks',
};

export const addPostActions = {
    uploadPost: action('uploadPost'),
    setCroppedImageForPost: action('setCroppedImageForPost'),
    setDescriptionForPost: action('setDescriptionForPost'),
    resetAddPost: action('resetAddPost'),
    informFileError: action('informFileError'),
};

storiesOf('Add Post', module)
    .add('new post',
        () => <AddPostCropper {...{
            ...addPostState,
            ...addPostActions,
        }}/>,
        )
    .add('add post',
        () => <AddPostCropper {...{
            ...addPostState,
            croppedImage: 'https://jsgram-post-images.s3.eu-west-2.amazonaws.com/1570603193496',
            ...addPostActions,
        }}/>,
        );
