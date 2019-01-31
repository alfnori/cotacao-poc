import React, { Component } from 'react';

import {inject, observer} from 'mobx-react';

import Menu from './components/lib/Menu';
import './stylesheets/App.scss';

import ConfigStore from "./stores/ConfigStore";

import Home from "./components/Home";
import Quotation from "./components/Quotation";

import {Router, Route, Switch, BrowserRouter, withRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";

class App extends Component {

    componentWillMount() {
        this.props.AuthStore.doFakeLogin();
    };

    render() {

        const {menuOpened} = this.props.ConfigStore;

        const MenuOpened = observer(({ menuOpened }) => <Menu open={menuOpened} />);

        let history = this.props.Navigator.history || createBrowserHistory();


        return (
            <div className="full-wrapper">

                <MenuOpened/>

                <div className={"App"}>
                    {/*<Home/>*/}
                    {/*<Quotation/>*/}
                    <Router history={history}>
                        <div>
                            <Route exact path='/home' component={Home}/>
                            <Route path='/quotation' component={Quotation}/>
                        </div>
                    </Router>
                </div>

            </div>
        );

    }
}

const Appx = observer(App);
export default inject('ConfigStore', 'AuthStore', 'Navigator')(Appx);
