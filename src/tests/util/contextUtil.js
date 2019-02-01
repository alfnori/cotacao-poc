import {React, PropTypes} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';

// setup file
import {configure, shallow, mount, render} from 'enzyme';

// Instantiate router context
const router = {
    history: new BrowserRouter().history,
    route: {
        location: {},
        match: {},
    },
};

const createContext = () => ({
    context: { router },
    childContextTypes: { router: shape({}) },
});

export function mountWrap(node) {
    return mount(node, createContext());
}

export function shallowWrap(node) {
    return shallow(node, createContext());
}
export function renderWrap(node) {
    return render(node, createContext());
}