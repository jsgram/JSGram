import { AboutUs } from './index';

import { shallow } from 'enzyme';
import React from 'react';

describe('AboutUs component:', () => {
    let renderer: any;

    beforeEach(() => {
        renderer = shallow(<AboutUs />);
    });

    test('render - success', () => {
        expect(renderer.html()).toHaveLength(5603);
    });
});
