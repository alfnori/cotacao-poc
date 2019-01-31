

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {BrowserRouter, withRouter} from 'react-router-dom';

import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import serveMock from './data/mockAPI';

// Components
import App from './App';

//Stores
import AuthStore    from './stores/AuthStore';
import CompanyStorex from './stores/CompanyStore';
import QuotationStorex from './stores/QuotationStore';
import ConfigStore from './stores/ConfigStore';

// Init store
let CompanyStore = new CompanyStorex(AuthStore);
let QuotationStore = new QuotationStorex(AuthStore);

// Stores
const stores = {
    AuthStore,
    ConfigStore,
    CompanyStore,
    QuotationStore
};

const AppBlock = withRouter(App);

ReactDOM.render(

    <Provider {...stores}>
        <BrowserRouter>
            <AppBlock/>
        </BrowserRouter>
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
