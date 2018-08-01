import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import reducer from './store/reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducer)}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
