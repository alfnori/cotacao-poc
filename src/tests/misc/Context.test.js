import React from 'react';
import ReactDOM from "react-dom";
import Home from "../../components/Home";
import * as ct from "../../utils/tests/contextUtil";
import ConfigStore from "../../stores/ConfigStore";
import AuthStore from "../../stores/AuthStore";
import {MyButton} from "../../utils/tests/all-components";



describe('Context helper', () => {


  it('renders mount wrapper', () => {

    let component = ct.mountWrap(<MyButton/>);
    const select = component.find("select").first();
    expect(select).toBeDefined();

  });

  it('renders shallow wrapper', () => {

    let component = ct.shallowWrap(<MyButton/>);
    const select = component.find("select").first();
    expect(select).toBeDefined();

  });

  it('renders render wrapper', () => {

    let component = ct.renderWrap(<MyButton/>);
    const select = component.find("select").first();
    expect(select).toBeDefined();

  });

});
