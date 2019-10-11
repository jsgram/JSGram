import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../App';
import { action } from '@storybook/addon-actions';
import Login from '../../containers/LoginContainer';

const loginState = {
    match: {
        params: {
            token: 'token',
        },
    },
};

const loginActions = {
    handleSubmit: action('handleSubmit'),
    onSubmit: action('onSubmit'),
};

storiesOf('Login', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('login', () => <Login {...{...loginState, ...loginActions}}/>);
