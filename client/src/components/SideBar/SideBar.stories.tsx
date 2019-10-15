import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../App';
import {SideBar} from './index';

export const sideBarState = {
    loggedUsername: 'Maks',
    loading: false,
    loggedId: '1a',
    urlUsername: 'maks',
    user: {
        fullName: 'Maks',
        photo: 'https://jsgram-profile-images.s3.eu-west-3.amazonaws.com/1569138592191',
    },
    profileEdit: {
        newFullName: '',
        newUsername: '',
    },
};
const sideBarActions = {
    getUser: action('getUser'),
    deletePhoto: action('deletePhoto'),
};

storiesOf('Side bar', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('side bar', () => <SideBar {...{...sideBarState, ...sideBarActions}}/>);
