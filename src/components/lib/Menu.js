import React from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import UserPicture from './UserPicture';
import CloseButton from './MyButton';
import {Icon} from 'react-materialize';

import '../../stylesheets/Menu.scss';

import {AnimationType} from '../../stores/ConfigStore';

class Menu extends React.Component {

    gotoUrl = (url) => {
        this.props.history.push(url);
        this.props.ConfigStore.animationType = AnimationType.TO_LEFT;
        this.props.ConfigStore.urlTo = url;
        this.props.ConfigStore.closeMenu();
    };

    loginFake = () => {
        this.props.AuthStore.doFakeLogin();
    };

    logoutFake = () => {
        this.props.AuthStore.doLogout();
    };

    logout = () => {
        this.props.AuthStore.doLogout();
        this.gotoUrl('/');
    };

    closeMenu = () => {
        this.props.ConfigStore.closeMenu();
    };

    render() {

        const {user} = this.props.AuthStore;
        const {menuOpened} = this.props.ConfigStore;

        let divStyle = {
            backgroundImage: 'none',
            backgroundColor: 'transparent'
        };

        let closeIcon = <Icon small>close</Icon>;

        return (
            <div className={"Menu " + (menuOpened === true ? 'open' : '')}>
                <div className="bg-cover" style={divStyle}/>
                <div className="bg-overlay"/>
                <div className="content">
                    <CloseButton onClick={this.closeMenu.bind(this)} span={'close-button'} icon={closeIcon}/>
                    <div className="profile">
                        <UserPicture user={user} disabled={true}/>
                        <div className="fullname">
                            {
                                user && user.id ? <span>Olá {user.name}.</span> : <span>Olá visitante.</span>
                            }
                        </div>
                    </div>

                    <div className="items">
                        <ul>
                            <li className="login-fake" onClick={this.loginFake.bind(this)}>Emular sessão</li>
                            <li className="logout-fake" onClick={this.logoutFake.bind(this)}>Emular perda de sessão</li>
                            <li className="logout" onClick={this.logout.bind(this)}>Sair</li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}

const Menux = observer(Menu);
export default withRouter(inject('ConfigStore', 'AuthStore')(Menux));
