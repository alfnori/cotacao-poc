import {observable, action, decorate} from 'mobx';

export const AnimationType = {
    TO_LEFT: 'left',
    TO_RIGHT: 'right',
    TO_TOP: 'top',
    TO_BOTTOM: 'bottom',
    FADE: 'fade'
};

class ConfigStore {
    
    menuOpened = false;
    animationType = 'fade';

    closeMenu = () => {
        this.menuOpened = false;
    };

    openMenu = () => {
        this.menuOpened = true;
    };
}

decorate(ConfigStore, {
    menuOpened : observable,
    animationType : observable,
    closeMenu : action,
    openMenu : action
});

export default ConfigStore;
