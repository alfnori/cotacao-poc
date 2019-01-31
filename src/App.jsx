import React, { Component } from 'react';

import {inject, observer} from 'mobx-react';

import Menu from './components/lib/Menu';
import './stylesheets/App.scss';

import PageShell from './components/lib/PageShell';

import Home from "./components/Home";
import Quotation from "./components/Quotation";


import {Route, BrowserRouter} from 'react-router-dom';

class App extends Component {

    componentWillMount() {
        this.props.AuthStore.doFakeLogin();
    };

    render() {

        return (
            <div className="full-wrapper">

                <Menu open={this.props.ConfigStore.menuOpened}/>

                <div className={"App"}>
                    <BrowserRouter>
                        <div className={"main"}>
                            <Route exact path='/' component={PageShell(Home)}/>
                            <Route path='/home' component={PageShell(Home)}/>
                            <Route path='/quotation' component={PageShell(Quotation)}/>
                            <Route path='*' component={Menu}/>
                        </div>
                    </BrowserRouter>
                </div>

            </div>
        );

    }
}

const Appx = observer(App);
export default inject('AuthStore', 'ConfigStore')(Appx);
