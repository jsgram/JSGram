import { renderField } from './renderField';
import * as reactstrap from 'reactstrap';

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

    let renderer;

    beforeEach(() => {
        reactstrap.Input = jest.fn(() => (<div></div>));
        renderer = shallow(<renderField {...props} />);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(137);
    });
});
