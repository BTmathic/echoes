import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setMap } from './actions/map';
import AppRouter from './routers/AppRouter';
import configureStore from './stores/configureStore';


import { map1 } from './maps/maps';
import { createStore } from 'redux';


import 'normalize.css/normalize.css'; // reset all browser conventions
import './styles/styles.scss';


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

//const jsx = <p>Loading...</p>;

store.dispatch(setMap());
ReactDOM.render(jsx, document.getElementById('app'));