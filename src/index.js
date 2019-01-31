

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {Router, withRouter} from 'react-router-dom';
import {RouterStore} from 'mobx-react-router';

import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import serveMock from './data/mockAPI';

// Components
import App from './App';

//Stores
import AuthStore    from './stores/AuthStore';
import CompanyStore from './stores/CompanyStore';
import QuotationStore from './stores/QuotationStore';
import ConfigStore from './stores/ConfigStore';
import {createBrowserHistory} from "history";

// Rotas
const Navigator = new RouterStore();

// Stores
const stores = {
    Navigator,
    AuthStore,
    ConfigStore,
    CompanyStore,
    QuotationStore
};

const AppBlock = withRouter(App);
let history = Navigator.history || createBrowserHistory();

ReactDOM.render(

    <Provider {...stores}>
        <Router history={history}>
            <AppBlock/>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


//Server mockup
serveMock();
