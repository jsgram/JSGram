import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ChangePassword from './index';
import { Provider } from 'react-redux';
import { store } from '../../../App';

storiesOf('Change password', module)
    .addDecorator((story: any): any => <Provider store={store}>{story()}</Provider>)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('change password', () => <ChangePassword/>);
