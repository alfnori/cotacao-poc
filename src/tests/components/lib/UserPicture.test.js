import React from 'react';

import UserPicture from '../../../components/lib/UserPicture';
import {mount} from '../../../utils/tests/Enzyme';

describe('UserPicture lib', () => {

  let props;
  let mountedPicture;

  const picture = () => {
    if (!mountedPicture) {
      mountedPicture = mount(
          <UserPicture {...props} />
      );
    }
    return mountedPicture;
  };

  let counter = 0;
  const mockCallBack = jest.fn();

  beforeEach(() => {
    counter = 0;
    props = {
      onClick: () => {
        mockCallBack();
      },
    };
    mountedPicture = undefined;
  });

  it("always renders a div with class picture-container", () => {
    const divs = picture().find("div.picture-container");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always binds onClick props", () => {
    const divs = picture().find("div.picture-container");
    divs.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });


});
