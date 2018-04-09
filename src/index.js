import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import dataSource from './reducers';
import * as methods from './actions';

const store = createStore(dataSource);
//
// console.log(store.dispatch(methods.addColumnHeader()));
// console.log(store.dispatch(methods.addRow()));
// console.log(store.dispatch(methods.addRow()));
// console.log(store.dispatch(methods.addRow()));
// console.log(store.dispatch(methods.updateColumnHeader(2, 'hello')));
// console.log(store.dispatch(methods.updateRowName(0, 'nnnnn')));
// console.log(store.dispatch(methods.updateRowData(0, 1, 'nnnnn')));
// console.log(store.getState());


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

