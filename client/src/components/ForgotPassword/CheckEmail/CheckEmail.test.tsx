import { CheckEmail } from './index';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

describe('CheckEmail component:', () => {
    let renderer: any;
    const checkEmail = jest.fn(() => 'some value');
    const handleSubmit = jest.fn(() => 'some value');
    const submitting = jest.fn(() => 'some value');

    beforeEach(() => {
        const store = configureStore()();
        renderer = shallow(<Provider store={store}>
                               <CheckEmail
                                   checkEmail={checkEmail}
                                   handleSubmit={handleSubmit}
                                   submitting={submitting}
                               />
                           </Provider>);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
