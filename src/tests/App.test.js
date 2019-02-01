import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import TestRenderer from 'react-test-renderer'; // ES6
import { BrowserRouter } from 'react-router-dom';

// setup file
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'mobx-react';

import AuthStore from '../stores/AuthStore';
import ConfigStore from '../stores/ConfigStore';
import {mountWrap, shallowWrap, renderWrap} from './util/contextUtil';

import stores from '../stores/stores';


configure({ adapter: new Adapter() });

it('renders without crashing?', () => {

  let props;
  const WrappedMount = () => renderWrap(mountWrap(<App {...stores} />));

  const div = document.createElement('div');
  ReactDOM.render(<WrappedMount/>, div);
  ReactDOM.unmountComponentAtNode(div);

});
