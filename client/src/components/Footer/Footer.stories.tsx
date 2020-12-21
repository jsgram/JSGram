import React from 'react';
import { storiesOf } from '@storybook/react';

import { Footer } from './index';

storiesOf('Footer', module)
    .add('footer',
        () => <Footer/>,
    );
