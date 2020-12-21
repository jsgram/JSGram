import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Index } from './index';

export const emailChangeState = {
    email: 'maks@gmail.com',
    user: {},
};

export const emailChangeAction = {
    setEmailText: action('setEmailText'),
    changeEmail: action('changeEmail'),
};

storiesOf('EmailChange', module)
    .add('change email', () => <Index {...{...emailChangeState, ...emailChangeAction}}/>);
