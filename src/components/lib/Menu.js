import React from 'react';
import {observer, inject} from 'mobx-react';

import UserPicture from './UserPicture';
import CloseButton from './CloseButton';

import '../../stylesheets/Menu.scss';

import {AnimationType}      from '../../stores/ConfigStore';

class Menu extends React.Component {

    gotoUrl = (url) => {
        this.props.ConfigStore.animationType = AnimationType.TO_LEFT;
        this.props.ConfigStore.closeMenu();
        this.props.Navigator.push(url);
    };

    loggout = () => {
        this.props.AuthStore.doLogout();
        this.gotoUrl('/');
    };

    closeMenu = () => {
        this.props.ConfigStore.closeMenu();
    };

    render() {

        const {user} = this.props.AuthStore;
        const {menuOpened} = this.props.ConfigStore;

        if (!user || !menuOpened)
            return false;

        let divStyle = {
            backgroundImage: 'none',
            backgroundColor: 'transparent'
        };

        return (
            <div className={"Menu " + (menuOpened === true ? 'open' : '')}>
                <div className="bg-cover" style={divStyle}/>
                <div className="bg-overlay"/>
                <div className="content">
                    <CloseButton onClick={this.closeMenu.bind(this)}/>
                    <div className="profile">
                        <UserPicture avatar={user.avatar} disabled={true}/>
                        <div className="fullname">
                            Olá { user.name }.
                        </div>
                    </div>

                    <div className="items">
                        <ul>
                            <li className="logout-ico" onClick={this.loggout.bind(this)}>Sair</li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}

export default inject('ConfigStore', 'AuthStore', 'Navigator')(observer(Menu));
