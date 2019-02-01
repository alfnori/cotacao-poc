import React from 'react';
import MyButton from '../../../components/lib/MyButton';
import {shallow} from '../../../utils/tests/Enzyme';

describe('MyButton lib', () => {

  let props;
  let mountedPMyButton;

  const mockCallBack = jest.fn();

  beforeEach(() => {
    props = {
      onClick: () => {
        mockCallBack();
      },
    };
    mountedPMyButton = undefined;
  });

  const page = () => {
    if (!mountedPMyButton) {
      mountedPMyButton = shallow(
          <MyButton {...props}/>
      );
    }
    return mountedPMyButton;
  };

  beforeEach(() => {
    mountedPMyButton = undefined;
  });

  it("always renders a span with class my-button", () => {
    const divs = page().find("span.my-button");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always binds onClick props", () => {
    const divs = page().find("span.my-button");
    divs.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

});
