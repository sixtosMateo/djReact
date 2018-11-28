import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// to create store need to import a method from redux
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'react-redux';


// this reducer will be used inside our store
import reducer from './store/reducers/auth';

// inherits from window
const composeEnhances = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

//second argument is an enhancer
    // composeEnhances takes in params and inside will handle our MIDDLEWARE
const store = createStore(reducer, composeEnhances(
  applyMiddleware(thunk)

))



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
