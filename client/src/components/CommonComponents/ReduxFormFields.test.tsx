import { renderField } from './ReduxFormFields';

import { shallow } from 'enzyme';
import React from 'react';

describe('renderField component:', () => {
    const props = {
        input: 'someintput',
        type: 'sometype',
        className: 'someclassName',
        placeholder: 'someplaceholder',
        meta: {
            error: 'somemetaerror',
            touched: true,
        },
    };

    let renderer: any;
    let Input: any;

    beforeEach(() => {
        Input = jest.fn(() => (<div></div>));
        // @ts-ignore
        renderer = shallow(<renderField {...props} />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
