import React from 'react';
import { shallow, getWrapper } from '../utils/tests/Enzyme';
import * as components from '../utils/tests/all-components';
import {mountWrap, shallowWrap, renderWrap} from '../utils/tests/contextUtil';

// if something, that could be mocked, is failing your test, jest.mock it
import stores from '../stores/stores';

test(`All Stores are provided?`, () => {
    expect(Object.keys(stores).length).toBe(4);
});

Object.keys(components).forEach(componentName => {
    const Component = components[componentName];
    describe(`Component: ${componentName}`, () => {
        test(`${componentName} renders with default props`, () => {
            const wrapper = shallowWrap(<Component {...stores}/>);
            expect(wrapper).toMatchSnapshot();
            expect(wrapper).toBeDefined();
        });
    });
});