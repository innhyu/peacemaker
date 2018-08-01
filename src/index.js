import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import reducer from './store/reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={applyMiddleware(createStore(reducer))}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
