import { Main } from './Landing';
import { shallow } from 'enzyme';
import React from 'react';

describe('Main component:', () => {
    let renderer: any;

    beforeEach(() => {
        renderer = shallow(<Main />);
    });

    test('render - success', () => {
        expect(renderer).toMatchSnapshot();
    });
});
