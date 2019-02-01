import React from 'react';
import Cnpj from '../../../components/lib/Cnpj';
import {mountWrap, shallowWrap} from '../../../utils/tests/contextUtil';
import CompanyStore from "../../../stores/CompanyStore";
import ConfigStore from "../../../stores/ConfigStore";
import {mount} from "../../../utils/tests/Enzyme";


describe('Cnpj lib', () => {

  let props;
  let state;
  let mountedCnpj;

  let comp = new CompanyStore();
  let config = new ConfigStore();

  const mockCall_CK = jest.fn();
  const mockCall_UCK = jest.fn();

  beforeEach(() => {
    props = {
      onClickChecked: () => {
        mockCall_CK();
      },
      onClickUnchecked: () => {
        mockCall_UCK();
      },
    };
    state = {
      isValid: false,
      value: null
    };
    mountedCnpj = undefined;
  });

  const page = () => {
    if (!mountedCnpj) {
      mountedCnpj = mount(
          <Cnpj {...props} ConfigStore={config} CompanyStore={comp} {...state}/>
      );
    }
    return mountedCnpj;
  };

  beforeEach(() => {
    mountedCnpj = undefined;
  });

  it("always renders a div with class cnpj", () => {
    const divs = page().find("div.cnpj");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('Valid inout like this 12.345.678/0001-23', () => {
    return new Promise((resolve) => {
      page().setState({
        isValid: true,
        valid: '12.345.678/0001-23'
      }, () => {
        page().setProps({
          isValid: true
        }, resolve);
      });
    }).then(() => {
      page().update();
      expect(page().state('isValid')).toEqual(true);
    });
  });

  it("always binds onClick on buttons UnCheck", () => {
    const divs = page().find(".UCK");
    divs.simulate('click');
    expect(mockCall_UCK.mock.calls.length).toEqual(1);
  });

  console.log(page().state());

  it("validade input ok", () => {
    const divs = page().find("input");
    divs.simulate('change', {target: {value: '12.345.678/0001-23'}});
    expect(page().state('isValid')).toEqual(true);
  });

  it("validade input bad", () => {
    const divs = page().find("input");
    divs.simulate('change', {target: {value: '12.345.678/0001-00'}});
    expect(page().state('isValid')).toEqual(false);
  });

});
