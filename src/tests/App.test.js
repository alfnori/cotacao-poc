import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import {mountWrap, shallowWrap, renderWrap} from '../utils/tests/contextUtil';

import stores from '../stores/stores';

jest.mock('react-dom', ()=> ({render: jest.fn()}))

it('renders without crashing index.js', () => {

  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  global.document.getElementById = (id) => id ==='root' && div
  expect(ReactDOM.render).toHaveBeenCalledWith('<div id="root"></div>');

});

it('renders without crashing App.js?', () => {

  let props;
  const WrappedMount = () => renderWrap(mountWrap(<App {...stores} />));

  const div = document.createElement('div');
  ReactDOM.render(<WrappedMount/>, div);
  ReactDOM.unmountComponentAtNode(div);

});
