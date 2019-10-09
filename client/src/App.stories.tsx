import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import {store} from './App';
import App from './App';

storiesOf('Screen', module)
    .addDecorator(
        (story: any): any =>
            <Provider store={store}>
                {story()}
            </Provider>,
    )
    .add('app', () => <App/>);
