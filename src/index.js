import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router/lib';
//import { matchPattern } from 'react-router/lib/PatternUtils';
import * as serviceWorker from './serviceWorker';

import "./mycss/body.css"

import IndexPage from './IndexPage.js';

let url = "http://143.106.73.94:5000";
ReactDOM.render(

    <Router history={browserHistory}>
        <Route path="/" component={() => <IndexPage url={url}/> } />
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
