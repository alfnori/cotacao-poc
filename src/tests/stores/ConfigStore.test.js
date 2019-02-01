import {observe, configure, spy} from 'mobx';
import ConfigStore from '../../stores/ConfigStore';

describe('ConfigStore', () => {

  let ConfigStorex;

  beforeEach(() => {
    configure(false);
  });

  it('makes Config observable', () => {

    ConfigStorex = new ConfigStore();

    let isObserved = false;
    const observation = observe(ConfigStorex, (changes) => {
      isObserved = true;
    });

    ConfigStorex.menuOpened = true;
    expect(isObserved).toEqual(true);
    ConfigStorex.menuOpened = false;

  });

  it('can open the menu', () => {
    ConfigStorex = new ConfigStore();
    ConfigStorex.openMenu();
    expect(ConfigStorex.menuOpened).toEqual(true);
  });

  it('can close the menu', () => {
    ConfigStorex = new ConfigStore();
    ConfigStorex.closeMenu();
    expect(ConfigStorex.menuOpened).toEqual(false);
  });

});