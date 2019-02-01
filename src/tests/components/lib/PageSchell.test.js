import React from 'react';
import ReactDOM from 'react-dom';

import PageSchell from '../../../components/lib/PageShell';
import MyButton from '../../../components/lib/MyButton';
import {shallow} from '../../../utils/tests/Enzyme';

describe('PageSchell lib', () => {

  let props;
  let mountedPageshell;

  const page = () => {
    if (!mountedPageshell) {
      mountedPageshell = shallow(
          <PageSchell {...props}>
              <span className={'foo'}></span>
          </PageSchell>
      );
    }
    return mountedPageshell;
  };

  beforeEach(() => {
    mountedPageshell = undefined;
  });

  it("always renders a div bubbles with group transition", () => {

    const div = document.createElement('div');
    ReactDOM.render(page(), div);
    ReactDOM.unmountComponentAtNode(div);

  });

});
