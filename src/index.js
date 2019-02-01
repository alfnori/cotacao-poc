

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {BrowserRouter, withRouter} from 'react-router-dom';

import './stylesheets/index.css';
import serveMock from './data/mockAPI';

// Components
import App from './App';
import stores from './stores/stores';

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

//Server mockup
serveMock();
