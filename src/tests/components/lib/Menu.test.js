import React from 'react';
import Menu from '../../../components/lib/Menu';
import {mountWrap, shallowWrap} from '../../../utils/tests/contextUtil';
import AuthStore from "../../../stores/AuthStore";
import ConfigStore from "../../../stores/ConfigStore";
import axios from "axios";


describe('Menu lib', () => {

  let props;
  let mountedMenu;

  let auth = new AuthStore();
  let config = new ConfigStore();

  const mockCallBack = jest.fn();

  beforeEach(() => {
    props = {
      onClick: () => {
        mockCallBack();
      },
    };
    mountedMenu = undefined;
  });

  const page = () => {
    if (!mountedMenu) {
      mountedMenu = mountWrap(
          <Menu {...props} ConfigStore={config} AuthStore={auth}/>
      );
    }
    return mountedMenu;
  };

  beforeEach(() => {
    mountedMenu = undefined;
  });

  it("always renders a div with class menu", () => {
    const divs = page().find("div.Menu");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always binds onClick on close button", () => {
    const divs = page().find(".my-button");
    divs.simulate('click');
    expect(config.menuOpened).toEqual(false);
  });

  it("can do emulate logout", () => {
    const divs = page().find(".logout");
    divs.simulate('click');
    expect(auth.user).toEqual(null);
  });

  it("can emulate login", () => {
    const divs = page().find(".logout");
    divs.simulate('click');
    expect(auth.user).not.toEqual(null);
  });

});
