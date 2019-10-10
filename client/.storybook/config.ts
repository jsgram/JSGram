import { configure } from '@storybook/react';
import '../src/styles/style.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

configure(require.context('../src', true, /\.stories\.tsx?$/), module);
