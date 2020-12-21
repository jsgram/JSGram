import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PopUpModal } from './index';
import { Provider } from 'react-redux';
import { store } from '../../App';

const popUpState = {
    loading: false,
    modal: true,
    photo: '',
};

const popUpAction = {
    deletePhoto: action('deletePhoto'),
    toggleModal: action('toggleModal'),
};

storiesOf('PopUp Modal', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .add('popup modal', () => <PopUpModal {...{...popUpState, ...popUpAction}}/>);
