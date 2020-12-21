import { Footer } from './index';

import { shallow } from 'enzyme';
import React from 'react';

describe('Footer component:', () => {
    let renderer: any;

    beforeEach(() => {
        renderer = shallow(<Footer />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
