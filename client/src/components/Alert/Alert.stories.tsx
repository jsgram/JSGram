import React from 'react';
import { storiesOf } from '@storybook/react';
import { clearAlert } from '../../store/alert/actions';

import Alert from './index';

export const alertState = {
    message: 'Comment added successfully',
    color: 'success',
    clearAlert,
};

storiesOf('Alert', module)
    .add('success',
        () => <Alert {...alertState}/>,
        )
    .add('error',
        () => <Alert {...alertState} message='Error' color='danger'/>,
        );
