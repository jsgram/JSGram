import React from 'react';
import { storiesOf } from '@storybook/react';
import { Error404 } from './index';
import { MemoryRouter } from 'react-router';

storiesOf('Error 404', module)
    .addDecorator((story: any): any => <MemoryRouter>{story()}</MemoryRouter>)
    .add('error 404',
        () => <Error404/>,
    );
